import { Positionable } from '../positionable';
import createRotatable, { Rotatable } from '../rotatable';

export interface SpriteRenderable {
  spriteName: string;
  positionable: Positionable;
  rotatable: Rotatable;
}

const createSpriteRenderable = (
  spriteName: string,
  positionable: Positionable,
  rotatable = createRotatable(0),
): SpriteRenderable => ({
  spriteName,
  positionable,
  rotatable,
});

export default createSpriteRenderable;
