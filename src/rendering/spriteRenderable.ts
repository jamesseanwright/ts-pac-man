import { Positionable } from '../positionable';

export interface SpriteRenderable {
  spriteName: string;
  positionable: Positionable;
}

const createSpriteRenderable = (
  spriteName: string,
  positionable: Positionable,
): SpriteRenderable => ({
  spriteName,
  positionable,
});

export default createSpriteRenderable;
