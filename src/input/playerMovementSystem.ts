// TODO: should this live in `input`?

import { Keyboard } from './keyboard';
import { TilePositionable } from '../tilePositionable';
import { canMoveToTile } from '../map';

export const createPlayerMovementSystem = (keyboard: Keyboard, canMoveTo: typeof canMoveToTile) =>
  (component: TilePositionable) => {
    const [column, row] = component.pos;
    let nextColumn = column;
    let nextRow = row;

    if (keyboard.isKeyPressed('ArrowLeft')) {
      nextColumn = column - 1;
    }

    if (canMoveTo(nextColumn, nextRow)) {
      /* Mutating to avoid GC-related jank
       * TODO: cover this in presentation */
      component.pos[0] = nextColumn;
      component.pos[1] = nextRow;
    }
  };
