import createSystem from '../system';
import { Project2D, Points2D } from './camera';
import { SpriteRenderable } from './spriteRenderable';
import { Rotatable } from '../rotatable';

export type Context = Pick<
  CanvasRenderingContext2D,
  'drawImage' | 'translate' | 'rotate' | 'resetTransform'
>;

const transform = (
  context: Context,
  [x, y, width, height]: Points2D,
  rotatable: Rotatable,
) => {
  context.translate(x + width / 2, y + height / 2);
  context.rotate(rotatable.angle);
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

  const projectedPoints = project(component.tilePositionable);
  const [, , projectedWidth, projectedHeight] = projectedPoints;

  transform(context, projectedPoints, component.rotatable);

  context.drawImage(
    sprite,
    -projectedWidth / 2,
    -projectedHeight / 2,
    projectedWidth,
    projectedHeight,
  );

  context.resetTransform();
};

export default (
  context: CanvasRenderingContext2D,
  spriteSheet: Map<string, ImageBitmap>,
  project2D: Project2D,
) =>
  createSystem<SpriteRenderable>(
    createSpriteRenderSystem(context, spriteSheet, project2D),
  );
