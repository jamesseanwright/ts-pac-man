import createSystem from '../system';
import project2D, { Project2D } from './camera';
import { SpriteRenderable } from './spriteRenderable';

type Context = Pick<CanvasRenderingContext2D, 'drawImage'> & {
  canvas: Pick<HTMLCanvasElement, 'width' | 'height'>
};

export const createSpriteRenderSystem = (
  context: Context,
  spriteSheet: Map<string, ImageBitmap>,
  project: Project2D,
) =>
  (component: SpriteRenderable) => {
    const sprite = spriteSheet.get(component.spriteName);

    if (!sprite) {
      throw new Error(`Sprite ${component.spriteName} not found!`);
    }

    const [x, y] = component.positionable.pos;
    const { width, height } = component.positionable;

    context.drawImage(sprite, ...project(context.canvas.width, context.canvas.height, x, y, width, height));
  };

export default (
  context: CanvasRenderingContext2D,
  spriteSheet: Map<string, ImageBitmap>,
  components: SpriteRenderable[],
) => createSystem<SpriteRenderable>(
  components,
  createSpriteRenderSystem(context, spriteSheet, project2D),
);
