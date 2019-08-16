import { TilePositionable } from '../tilePositionable';
import createRotatable, { Rotatable } from '../rotatable';

export interface SpriteRenderable {
  spriteName: string;
  tilePositionable: TilePositionable;
  rotatable: Rotatable;
}

const createSpriteRenderable = (
  spriteName: string,
  tilePositionable: TilePositionable,
  rotatable = createRotatable(0),
): SpriteRenderable => ({
  spriteName,
  tilePositionable,
  rotatable,
});

export default createSpriteRenderable;
