import { Positionable } from '../positionable';
import { Rotatable } from '../rotatable';

export interface SpriteRenderable {
  spriteName: string;
  positionable: Positionable;
  rotatable?: Rotatable;
}

const createSpriteRenderable = (
  spriteName: string,
  positionable: Positionable,
  rotatable?: Rotatable,
): SpriteRenderable => ({
  spriteName,
  positionable,
  rotatable,
});

export default createSpriteRenderable;
