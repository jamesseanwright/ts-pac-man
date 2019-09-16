import createSpriteSheet from './spriteSheet';
import createSpriteRenderSystem from './rendering/spriteRenderSystem';
import spriteAnimationSystem from './rendering/spriteAnimationSystem';
import createKeyboardMovementSystem from './input/keyboardMovementSystem';
import directionRotationSystem from './directionRotationSystem';
import trackingSystem from './tracking/trackingSystem';
import autoMovementSystem from './movement/autoMovementSystem';
import createKeyboard from './input/keyboard';
import bindPacman from './entities/pacman';
import bindBlinky from './entities/blinky';
import createProject2D from './rendering/camera';
import bindMap from './map';

const throwIfNull = <T>(value: T | null, failureMessage: string) => {
  if (value === null) {
    throw new Error(failureMessage);
  }

  return value;
};

const canvas = throwIfNull(
  document.body.querySelector<HTMLCanvasElement>('#game'),
  'Game canvas could not be found in the DOM!',
);

const context = throwIfNull(
  canvas.getContext('2d'),
  'Canvas context is missing!',
);

const project2D = createProject2D([canvas.width, canvas.height]);

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

// TODO: remove when done
const createSteppableRaf = () => {
  let callback: FrameRequestCallback;

  window.addEventListener('keydown', ({ key }) => {
    if (key === 'x') {
      window.requestAnimationFrame(callback);
    }
  });

  const rAF = (cb: FrameRequestCallback) => {
    if (!callback) {
      callback = cb;
      window.requestAnimationFrame(callback);
    }
  };

  return rAF;
};

// const requestAnimationFrame = createSteppableRaf();

(async () => {
  const sprites = await loadSpriteSheet();

  // TODO: trim sprite sheet to keep only necessary sprites
  const spriteSheet = await createSpriteSheet(sprites, [
    ['pac-man-0', [473, 1, 12, 14]],
    ['pac-man-1', [457, 1, 12, 14]],
    ['blinky', [457, 65, 14, 14]],

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

  const keyboardMovementSystem = createKeyboardMovementSystem(keyboard);

  bindMap(spriteRenderSystem);

  const [targetPositionable] = bindPacman(
    spriteRenderSystem,
    spriteAnimationSystem,
    keyboardMovementSystem,
    directionRotationSystem,
    autoMovementSystem,
  );

  bindBlinky(
    spriteRenderSystem,
    trackingSystem,
    autoMovementSystem,
    targetPositionable,
  );

  const loop = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spriteRenderSystem.update(time);
    spriteAnimationSystem.update(time);
    keyboardMovementSystem.update(time);
    directionRotationSystem.update(time);
    trackingSystem.update(time);
    autoMovementSystem.update(time);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
