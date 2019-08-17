import createTilePositionable, { TilePositionable } from '../tilePositionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';

const bindPacman = (
  spriteRenderSystem: System<SpriteRenderable>,
  playerMovementSystem: System<TilePositionable>,
) => {
  const positionable = createTilePositionable(1, 1, 3, 3);
  const spriteRenderable = createSpriteRenderable('pac-man', positionable);

  spriteRenderSystem.register(spriteRenderable);
  playerMovementSystem.register(positionable);
};

export default bindPacman;
