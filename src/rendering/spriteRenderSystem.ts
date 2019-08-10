import createSystem from '../system';
import project2D, { Project2D } from './camera';
import { SpriteRenderable } from './spriteRenderable';

type Context = Pick<CanvasRenderingContext2D, 'drawImage'> & {
  canvas: Pick<HTMLCanvasElement, 'width' | 'height'>;
};

export const createSpriteRenderSystem = (
  context: Context,
  spriteSheet: Map<string, ImageBitmap>,
  project: Project2D,
) => (component: SpriteRenderable) => {
  const sprite = spriteSheet.get(component.spriteName);

  if (!sprite) {
    throw new Error(`Sprite ${component.spriteName} not found!`);
  }

  const [x, y] = component.positionable.pos;
  const { width, height } = component.positionable;

  console.log(...project(x, y, width, height));

  context.drawImage(sprite, ...project(x, y, width, height));
};

export default (
  context: CanvasRenderingContext2D,
  spriteSheet: Map<string, ImageBitmap>,
  project2D: Project2D,
) =>
  createSystem<SpriteRenderable>(
    createSpriteRenderSystem(context, spriteSheet, project2D),
  );
