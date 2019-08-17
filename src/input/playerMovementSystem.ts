// TODO: should this live in `input`?

import { Keyboard } from './keyboard';
import { TilePositionable } from '../tilePositionable';
import { Tile } from '../map';

export const createPlayerMovementSystem = (keyboard: Keyboard, map: Tile[][]) =>
  (component: TilePositionable) => {
    // if (keyb)
  };
