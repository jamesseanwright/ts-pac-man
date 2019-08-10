import createSpriteSheet from './spriteSheet';
import createSpriteRenderSystem from './rendering/spriteRenderSystem';
import bindPacman from './entities/pacman';
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

// TODO: abstract tile computation somewhere
const TILE_PIXEL_WIDTH = 21;
const TILE_PIXEL_HEIGHT = 20;
const TILE_SPRITE_SHEET_START_X = 228;
const TILE_SPRITE_SHEET_START_Y = 0;

const computeTiles = () => {
  const tiles: object[][] = [];

  // TODO: get functional with this?
  for (let i = 0; i < canvas.width; i += TILE_PIXEL_WIDTH) {
    tiles[i] = [];

    for (let j = 0; j < canvas.height; j += TILE_PIXEL_HEIGHT) {
      tiles[i][j] = { i, j };
    }
  }

  return tiles;
};

console.log(computeTiles());

context.imageSmoothingEnabled = false;

(async () => {
  const sprites = await loadSpriteSheet();

  const spriteSheet = await createSpriteSheet(sprites, [
    ['pac-man', [473, 0, 12, 14]],
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(
    context,
    spriteSheet,
    project2D,
  );

  bindPacman(spriteRenderSystem);

  const loop = (time: number) => {
    spriteRenderSystem.update(time);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
