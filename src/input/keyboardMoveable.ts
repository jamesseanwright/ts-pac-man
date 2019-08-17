import { TilePositionable } from '../tilePositionable';
import { Moveable } from '../moveable';

export interface KeyboardMoveable {
  tilePositionable: TilePositionable;
  moveable: Moveable;
}

const createKeyboardMoveable = (
  tilePositionable: TilePositionable,
  moveable: Moveable,
): KeyboardMoveable => ({
  tilePositionable,
  moveable,
});

export default createKeyboardMoveable;
