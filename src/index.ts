import createSpriteSheet from './spriteSheet';
import createSpriteRenderSystem from './rendering/spriteRenderSystem';
import bindPacman from './entities/pacman';

const sprites = document.body.querySelector<HTMLImageElement>('#spriteSheet');
const canvas = document.body.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Game canvas could not be found in the DOM!');
}

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('Game canvas could not be found in the DOM!');
}

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

  const spriteRenderSystem = createSpriteRenderSystem(context, spriteSheet)

  bindPacman(spriteRenderSystem);

  const loop = (time: number) => {
    spriteRenderSystem.update(time);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
})();
