import createTilePositionable from '../tilePositionable';
import { System } from '../system';

import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';

import createKeyboardMoveable, {
  KeyboardMoveable,
} from '../input/keyboardMoveable';

import createMoveable from '../moveable';
import createDirectionRotatable, {
  DirectionRotatable,
} from '../directionRotatable';
import createRotatable from '../rotatable';
import createSpriteAnimatable, {
  SpriteAnimatable,
} from '../rendering/spriteAnimatable';
import createAutoMoveable, { AutoMoveable } from '../movement/autoMoveable';

const bindPacman = (
  spriteRenderSystem: System<SpriteRenderable>,
  spriteAnimationSystem: System<SpriteAnimatable>,
  keyboardMovementSystem: System<KeyboardMoveable>,
  directionRotationSystem: System<DirectionRotatable>,
  autoMovementSystem: System<AutoMoveable>,
) => {
  const positionable = createTilePositionable(26, 46, 3, 3);
  const rotatable = createRotatable();
  const moveable = createMoveable(0, 0, 0.25, 0.25); // TODO: => tileMoveable

  const spriteRenderable = createSpriteRenderable(
    'pac-man-0',
    positionable,
    rotatable,
  );

  const spriteAnimatable = createSpriteAnimatable(
    spriteRenderable,
    128,
    2,
    'pac-man',
  );

  const keyboardMoveable = createKeyboardMoveable(positionable, moveable);
  const speedRotatable = createDirectionRotatable(moveable, rotatable);
  const autoMoveable = createAutoMoveable(positionable, moveable);

  spriteRenderSystem.register(spriteRenderable);
  spriteAnimationSystem.register(spriteAnimatable);
  keyboardMovementSystem.register(keyboardMoveable);
  directionRotationSystem.register(speedRotatable);
  autoMovementSystem.register(autoMoveable);

  return [positionable]; // TODO: make entities return all components
};

export default bindPacman;
