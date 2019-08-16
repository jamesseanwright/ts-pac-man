import createTilePositionable from '../tilePositionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';

const bindPacman = (spriteRenderSystem: System<SpriteRenderable>) => {
  const positionable = createTilePositionable(0.1, 0.4, 0.053, 0.056);
  const spriteRenderable = createSpriteRenderable('pac-man', positionable);

  spriteRenderSystem.register(spriteRenderable);
};

export default bindPacman;
