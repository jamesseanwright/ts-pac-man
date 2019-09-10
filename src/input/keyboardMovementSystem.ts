// TODO: should this live in `input`?
// TODO: rename playerMovementSystem

import { Keyboard } from './keyboard';
import { Point2D } from '../tilePositionable';
import { canMoveToTile } from '../map';
import createSystem from '../system';
import { KeyboardMoveable } from './keyboardMoveable';

const nullDirection: Point2D = [0, 0];

const getDirection = (keyboard: Keyboard): Point2D => {
  switch (keyboard.getLastPressedKey()) {
    case 'ArrowLeft':
      return [-1, 0];

    case 'ArrowRight':
      return [1, 0];

    case 'ArrowUp':
      return [0, -1];

    case 'ArrowDown':
      return [0, 1];

    default:
      return nullDirection;
  }
};

// TODO: keyboard direction system naming
export const createKeyboardMovementSystem = (
  keyboard: Keyboard,
  canMoveTo: typeof canMoveToTile,
) => (component: KeyboardMoveable) => {
  const direction = getDirection(keyboard);

  component.moveable.direction = canMoveTo(component.tilePositionable, direction)
    ? direction
    : nullDirection;
};

/* Pass in keyboard as external dependency so
 * we can control when events are registered */
export default (keyboard: Keyboard) =>
  createSystem<KeyboardMoveable>(
    createKeyboardMovementSystem(keyboard, canMoveToTile),
  );
