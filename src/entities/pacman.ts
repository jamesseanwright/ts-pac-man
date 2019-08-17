import createTilePositionable from '../tilePositionable';
import { System } from '../system';

import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';

import createKeyboardMoveable, {
  KeyboardMoveable,
} from '../input/keyboardMoveable';

import createMoveable from '../moveable';
import createSpeedRotatable, { SpeedRotatable } from '../speedRotatable';
import createRotatable from '../rotatable';

const bindPacman = (
  spriteRenderSystem: System<SpriteRenderable>,
  playerMovementSystem: System<KeyboardMoveable>,
  speedRotationSystem: System<SpeedRotatable>,
) => {
  const positionable = createTilePositionable(1, 1, 3, 3);
  const rotatable = createRotatable();
  const moveable = createMoveable(0.25, 0); // TODO: => tileMoveable
  const spriteRenderable = createSpriteRenderable(
    'pac-man',
    positionable,
    rotatable,
  );
  const keyboardMoveable = createKeyboardMoveable(positionable, moveable);
  const speedRotatable = createSpeedRotatable(moveable, rotatable);

  spriteRenderSystem.register(spriteRenderable);
  playerMovementSystem.register(keyboardMoveable);
  speedRotationSystem.register(speedRotatable);
};

export default bindPacman;
