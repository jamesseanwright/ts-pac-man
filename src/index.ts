import createSpriteSheet, { SpriteDefinition } from './spriteSheet';
import createSpriteRenderSystem from './rendering/spriteRenderSystem';
import bindPacman from './entities/pacman';
import bindBlinky from './entities/blinky';
import createProject2D from './rendering/camera';

const sprites = document.body.querySelector<HTMLImageElement>('#spriteSheet');
const canvas = document.body.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Game canvas could not be found in the DOM!');
}

const context = canvas.getContext('2d');

if (!context) {
  // TODO: abstract this pattern with a guard?
  throw new Error('Game canvas could not be found in the DOM!');
}

const project2D = createProject2D(canvas.width, canvas.height);

/* We have to load the image dynamically
 * as we need to be able to absolutely
 * guarantee that it has loaded before we
 * attempt to compute the sprite sheet */
const loadSpriteSheet = () =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const sheet = new Image();
    sheet.onload = () => resolve(sheet);
    sheet.onerror = reject;
    sheet.src = '/images/spritesheet.png';
  });

// TODO: abstract all this tile stuff
const TILE_PIXEL_WIDTH = 21;
const TILE_PIXEL_HEIGHT = 20;
const TILE_SPRITE_SHEET_START_X = 228;
const TILE_SPRITE_SHEET_START_Y = 0;

interface Tile {
  // TODO: reuse positionable?!
  x: number;
  y: number;
}

const computeTiles = () => {
  const tiles: Tile[][] = [];
  let row = 0;

  // TODO: get functional with this!
  for (let x = 0; x < canvas.width; x += TILE_PIXEL_WIDTH) {
    tiles[x] = [];

    for (let y = 0; y < canvas.height; y += TILE_PIXEL_HEIGHT) {
      tiles[x][y] = { x, y };
    }
  }

  return tiles;
};

const tiles = computeTiles();

context.imageSmoothingEnabled = false;

(async () => {
  const sprites = await loadSpriteSheet();

  const spriteSheet = await createSpriteSheet(sprites, [
    ['pac-man', [473, 0, 12, 14]],
    ['blinky', [457, 65, 14, 14]],
    ...tiles.flatMap(
      // Complex, but can be simplified over time
      (row, i) =>
        row.map(
          (tile, i) =>
            [
              `tile-${tile.x}-${tile.y}`,
              [tile.x, tile.y, TILE_PIXEL_WIDTH, TILE_PIXEL_HEIGHT],
            ] as SpriteDefinition,
        ),
    ),
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(
    context,
    spriteSheet,
    project2D,
  );

  bindPacman(spriteRenderSystem);
  bindBlinky(spriteRenderSystem);

  const loop = (time: number) => {
    spriteRenderSystem.update(time);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
