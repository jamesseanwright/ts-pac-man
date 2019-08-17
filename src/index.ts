import createSpriteSheet, { SpriteDefinition } from './spriteSheet';
import createSpriteRenderSystem from './rendering/spriteRenderSystem';
import createPlayerMovementSystem from './input/keyboardMovementSystem';
import speedRotationSystem from './speedRotationSystem';
import createKeyboard from './input/keyboard';
import bindPacman from './entities/pacman';
import bindBlinky from './entities/blinky';
import createProject2D from './rendering/camera';
import bindMap from './map';

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

context.imageSmoothingEnabled = false;

(async () => {
  const sprites = await loadSpriteSheet();

  // TODO: trim sprite sheet to keep only necessary sprites
  const spriteSheet = await createSpriteSheet(sprites, [
    ['pac-man', [473, 0, 12, 14]],
    // ['blinky', [457, 65, 14, 14]],

    // Map tiles keyed by type
    ['A', [228, 0, 4, 4]],
    ['B', [248, 20, 4, 4]],
    ['C', [233, 0, 4, 4]],
    ['D', [338, 0, 4, 4]],
    ['F', [312, 100, 4, 4]],
    ['H', [332, 100, 4, 4]],
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(
    context,
    spriteSheet,
    project2D,
  );

  const keyboard = createKeyboard(window, [
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ]);

  const playerMovementSystem = createPlayerMovementSystem(keyboard);

  bindMap(spriteRenderSystem);

  bindPacman(spriteRenderSystem, playerMovementSystem, speedRotationSystem);
  // bindBlinky(spriteRenderSystem);

  const loop = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spriteRenderSystem.update(time);
    playerMovementSystem.update(time);
    speedRotationSystem.update(time);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
