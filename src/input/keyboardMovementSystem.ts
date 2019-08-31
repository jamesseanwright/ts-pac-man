// TODO: should this live in `input`?
// TODO: rename playerMovementSystem

import { Keyboard } from './keyboard';
import { Point2D } from '../tilePositionable';
import { canMoveToTile } from '../map';
import createSystem from '../system';
import { KeyboardMoveable } from './keyboardMoveable';

const getDirection = (
  keyboard: Keyboard,
): Point2D => {
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
      return [0, 0]; // TODO
  }
};

const move = (
  { tilePositionable, moveable }: KeyboardMoveable,
  direction: Point2D,
) => {
  direction.forEach((dir, i) => {
    const hasReachedNextTile =
      tilePositionable.offset[i] !== 0 && tilePositionable.offset[i] % 1 === 0;

    if (hasReachedNextTile) {
      tilePositionable.pos[i] += dir;
      tilePositionable.offset[i] = 0;
    } else {
      tilePositionable.offset[i] += moveable.speed[i] * dir;
      moveable.direction[i] = dir;
    }
  });
};

export const createKeyboardMovementSystem = (
  keyboard: Keyboard,
  canMoveTo: typeof canMoveToTile,
) => (component: KeyboardMoveable) => {
  const [column, row] = component.tilePositionable.pos;
  const direction = getDirection(keyboard);

  if (
    canMoveTo(
      component.tilePositionable,
      column + Math.ceil(direction[0]),
      row + Math.ceil(direction[1]),
    )
  ) {
    move(component, direction);
  }
};

/* Pass in keyboard as external dependency so
 * we can control when events are registered */
export default (keyboard: Keyboard) =>
  createSystem<KeyboardMoveable>(
    createKeyboardMovementSystem(keyboard, canMoveToTile),
  );
