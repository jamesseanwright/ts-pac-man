import createSystem from '../system';
import project2D, { Project2D } from './camera';
import { SpriteRenderable } from './spriteRenderable';
import { Rotatable } from '../rotatable';
import { Positionable } from '../positionable';

export type Context = Pick<
  CanvasRenderingContext2D,
  | 'drawImage'
  | 'translate'
  | 'rotate'
  | 'resetTransform'
>;

const rotate = (context: Context, project: Project2D, rotatable: Rotatable, positionable: Positionable) => {
  const { pos, width, height } = positionable;
  const [x, y, projectedWidth, projectedHeight] = project(pos[0], pos[1], width, height);

  context.translate(x + projectedWidth / 2, y + projectedHeight / 2);
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

  const [x, y] = component.positionable.pos;
  const { width, height } = component.positionable;

  if (component.rotatable) {
    rotate(context, project, component.rotatable, component.positionable);
  }

  context.drawImage(sprite, ...project(x, y, width, height));
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
