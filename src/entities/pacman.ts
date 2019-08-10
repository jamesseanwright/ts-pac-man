import createPositionable from '../positionable';
import createSpriteRenderable, { SpriteRenderable } from '../rendering/spriteRenderable';
import { System } from '../system';

const bindPacman = (spriteRenderSystem: System<SpriteRenderable>) => {
  const positionable = createPositionable(0, 0, 9, 9);
  const spriteRenderable = createSpriteRenderable('pac-man', positionable);

  spriteRenderSystem.register(spriteRenderable);
};

export default bindPacman;
