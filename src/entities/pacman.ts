import createTilePositionable from '../tilePositionable';
import { System } from '../system';

import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';

import createKeyboardMoveable, {
  KeyboardMoveable,
} from '../input/keyboardMoveable';

import createMoveable from '../moveable';
import createSpeedRotatable, { MovementRotatable } from '../movementRotatable';
import createRotatable from '../rotatable';

const bindPacman = (
  spriteRenderSystem: System<SpriteRenderable>,
  playerMovementSystem: System<KeyboardMoveable>,
  moveRotationSystem: System<MovementRotatable>,
) => {
  const positionable = createTilePositionable(1, 1, 3, 3);
  const rotatable = createRotatable();
  const moveable = createMoveable(1, 0, 1, 1); // TODO: => tileMoveable
  const spriteRenderable = createSpriteRenderable(
    'pac-man',
    positionable,
    rotatable,
  );
  const keyboardMoveable = createKeyboardMoveable(positionable, moveable);
  const speedRotatable = createSpeedRotatable(moveable, rotatable);

  spriteRenderSystem.register(spriteRenderable);
  playerMovementSystem.register(keyboardMoveable);
  moveRotationSystem.register(speedRotatable);
};

export default bindPacman;
