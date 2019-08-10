import createPositionable from '../positionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';

const bindBlinky = (spriteRenderSystem: System<SpriteRenderable>) => {
  const positionable = createPositionable(0.3, 0.3, 0.056, 0.056);
  const spriteRenderable = createSpriteRenderable('blinky', positionable);

  spriteRenderSystem.register(spriteRenderable);
};

export default bindBlinky;
