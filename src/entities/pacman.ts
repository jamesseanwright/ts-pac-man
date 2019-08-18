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
import createSpriteAnimatable, { SpriteAnimatable } from '../rendering/spriteAnimatable';

const bindPacman = (
  spriteRenderSystem: System<SpriteRenderable>,
  spriteAnimationSystem: System<SpriteAnimatable>,
  playerMovementSystem: System<KeyboardMoveable>,
  moveRotationSystem: System<MovementRotatable>,
) => {
  const positionable = createTilePositionable(1, 1, 3, 3);
  const rotatable = createRotatable();
  const moveable = createMoveable(0, 0, 0.25, 0.25); // TODO: => tileMoveable

  const spriteRenderable = createSpriteRenderable(
    'pac-man-0',
    positionable,
    rotatable,
  );

  const spriteAnimatable = createSpriteAnimatable(spriteRenderable, 128, 2, 'pac-man');
  const keyboardMoveable = createKeyboardMoveable(positionable, moveable);
  const speedRotatable = createSpeedRotatable(moveable, rotatable);

  spriteRenderSystem.register(spriteRenderable);
  spriteAnimationSystem.register(spriteAnimatable);
  playerMovementSystem.register(keyboardMoveable);
  moveRotationSystem.register(speedRotatable);
};

export default bindPacman;
