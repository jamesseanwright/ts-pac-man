import createTilePositionable from '../tilePositionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import createMoveable from '../moveable';
import { System } from '../system';

const bindBlinky = (spriteRenderSystem: System<SpriteRenderable>) => {
  const positionable = createTilePositionable(45, 1, 3, 3);
  const moveable = createMoveable(0, 0, 0.23, 0.23);
  const spriteRenderable = createSpriteRenderable('blinky', positionable);

  spriteRenderSystem.register(spriteRenderable);
};

export default bindBlinky;
