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

if (!context) { // TODO: abstract this pattern with a guard?
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

(async () => {
  const sprites = await loadSpriteSheet();

  const spriteSheet = await createSpriteSheet(sprites, [
    ['pac-man', [473, 0, 12, 14]],
  ]);

  const spriteRenderSystem = createSpriteRenderSystem(context, spriteSheet, project2D);

  bindPacman(spriteRenderSystem);

  const loop = (time: number) => {
    spriteRenderSystem.update(time);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
