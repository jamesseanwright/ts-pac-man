import createPositionable from '../positionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';

const bindPacman = (spriteRenderSystem: System<SpriteRenderable>) => {
  const positionable = createPositionable(0, 0, 0.06, 0.08);
  const spriteRenderable = createSpriteRenderable('pac-man', positionable);

  spriteRenderSystem.register(spriteRenderable);
};

export default bindPacman;