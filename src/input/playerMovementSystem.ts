// TODO: should this live in `input`?

import { Keyboard } from './keyboard';
import { TilePositionable } from '../tilePositionable';
import { canMoveToTile } from '../map';
import createSystem from '../system';

export const createPlayerMovementSystem = (keyboard: Keyboard, canMoveTo: typeof canMoveToTile) =>
  (component: TilePositionable) => {
    const [column, row] = component.pos;
    let nextColumn = column;
    let nextRow = row;

    if (keyboard.isKeyPressed('ArrowLeft')) {
      nextColumn = column - 1;
    } else if (keyboard.isKeyPressed('ArrowRight')) {
      nextColumn = column + 1;
    }

    if (keyboard.isKeyPressed('ArrowUp')) {
      nextRow = row - 1;
    } else if (keyboard.isKeyPressed('ArrowDown')) {
      nextRow = row + 1;
    }

    if (canMoveTo(nextColumn, nextRow)) {
      /* Mutating to avoid GC-related jank
       * TODO: cover this in presentation */
      component.pos[0] = nextColumn;
      component.pos[1] = nextRow;
    }
  };

/* Pass in keyboard as external dependency so
 * we can control when events are registered */
export default (keyboard: Keyboard) =>
  createSystem<TilePositionable>(
    createPlayerMovementSystem(keyboard, canMoveToTile),
  );
