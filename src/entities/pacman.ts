import createTilePositionable from '../tilePositionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';
import createKeyboardMoveable, { KeyboardMoveable } from '../input/keyboardMoveable';
import createMoveable from '../moveable';

const bindPacman = (
  spriteRenderSystem: System<SpriteRenderable>,
  playerMovementSystem: System<KeyboardMoveable>,
) => {
  const positionable = createTilePositionable(1, 1, 3, 3);
  const moveable = createMoveable(0.25, 0); // TODO: => tileMoveable
  const spriteRenderable = createSpriteRenderable('pac-man', positionable);
  const keyboardMoveable = createKeyboardMoveable(positionable, moveable);

  spriteRenderSystem.register(spriteRenderable);
  playerMovementSystem.register(keyboardMoveable);
};

export default bindPacman;
