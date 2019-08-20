/* TODO: this is a copy-paste of
 * KeyboardMoveable. Share these! */

import { TilePositionable } from '../tilePositionable';
import { Moveable } from '../moveable';

export interface AutoMoveable {
  tilePositionable: TilePositionable;
  moveable: Moveable;
}

const createAutoMoveable = (
  tilePositionable: TilePositionable,
  moveable: Moveable,
): AutoMoveable => ({
  tilePositionable,
  moveable,
});

export default createAutoMoveable;
