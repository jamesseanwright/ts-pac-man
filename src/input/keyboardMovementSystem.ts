// TODO: should this live in `input`?
// TODO: rename playerMovementSystem

import { Keyboard } from './keyboard';
import { TilePositionable } from '../tilePositionable';
import { canMoveToTile } from '../map';
import createSystem from '../system';
import { KeyboardMoveable } from './keyboardMoveable';
import { Moveable } from '../moveable';

const getDirection = (keyboard: Keyboard, { speed }: Moveable) => {
  switch (keyboard.getLastPressedKey()) {
    case 'ArrowLeft':
      return [speed[0] * -1, 0];

    case 'ArrowRight':
      return [speed[0] * 1, 0];

    case 'ArrowUp':
      return [0, speed[1] * -1];

    case 'ArrowDown':
      return [0, speed[1] * 1];

    default:
      return [0, 0]; // TODO
  }
};

export const createKeyboardMovementSystem = (
  keyboard: Keyboard,
  canMoveTo: typeof canMoveToTile,
) => (component: KeyboardMoveable) => {
  const [column, row] = component.tilePositionable.pos;
  const direction = getDirection(keyboard, component.moveable);

  if (canMoveTo(component.tilePositionable, column + direction[0], row + direction[1])) {
    /* Mutating to avoid GC-related jank
     * TODO: cover this in presentation */

    direction.forEach((dir, i) => {
      component.tilePositionable.pos[i] += component.moveable.speed[i] * dir;
    });
  }
};

/* Pass in keyboard as external dependency so
 * we can control when events are registered */
export default (keyboard: Keyboard) =>
  createSystem<KeyboardMoveable>(
    createKeyboardMovementSystem(keyboard, canMoveToTile),
  );
