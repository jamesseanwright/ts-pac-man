import createTilePositionable from '../tilePositionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';

const bindBlinky = (spriteRenderSystem: System<SpriteRenderable>) => {
  const positionable = createTilePositionable(0.3, 0.3, 0.062, 0.057);
  const spriteRenderable = createSpriteRenderable('blinky', positionable);

  spriteRenderSystem.register(spriteRenderable);
};

export default bindBlinky;
