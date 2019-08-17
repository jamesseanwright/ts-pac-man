// TODO: should this live in `input`?

import { Keyboard } from './keyboard';
import { TilePositionable } from '../tilePositionable';
import { canMoveToTile } from '../map';
import createSystem from '../system';
import { KeyboardMoveable } from './keyboardMoveable';
import { Moveable } from '../moveable';

const getSpeed = (keyboard: Keyboard, moveable: Moveable) => {
  switch (keyboard.getLastPressedKey()) {
    case 'ArrowLeft':
      return [-1, 0];

    case 'ArrowRight':
      return [1, 0];

    case 'ArrowUp':
      return [0, -1];

    case 'ArrowDown':
      return [0, 1]

    default:
      return moveable.speed;
  }
};

export const createKeyboardMovementSystem = (
  keyboard: Keyboard,
  canMoveTo: typeof canMoveToTile,
) => (component: KeyboardMoveable) => {
  const [column, row] = component.tilePositionable.pos;
  const [xSpeed, ySpeed] = getSpeed(keyboard, component.moveable);

  if (canMoveTo(column + xSpeed, row + ySpeed)) {
    /* Mutating to avoid GC-related jank
     * TODO: cover this in presentation */
    component.moveable.speed[0] = xSpeed;
    component.moveable.speed[1] = ySpeed;
  } else {
    component.moveable.speed[0] = 0;
    component.moveable.speed[1] = 0;
  }

  // TODO: split into own system?
  component.tilePositionable.pos[0] += component.moveable.speed[0];
  component.tilePositionable.pos[1] += component.moveable.speed[1];
};

/* Pass in keyboard as external dependency so
 * we can control when events are registered */
export default (keyboard: Keyboard) =>
  createSystem<KeyboardMoveable>(
    createKeyboardMovementSystem(keyboard, canMoveToTile),
  );
