/* TODO: due to time constraints, this is a pseudo-
 * duplicated from keyboardMovementSystem!
 * Either use this system for keyboard moveables
 * or find a good way to share this code! */

import { AutoMoveable } from './autoMoveable';
import createSystem from '../system';

/* Given this is only used with tracking
 * we can safely assume, FOR NOW, that we
 * don't need to check if a tile is walable */
export const autoMovementSystem = ({
  tilePositionable,
  moveable,
}: AutoMoveable) => {
  moveable.direction.forEach((dir, i) => {
    const hasReachedNextTile = Math.abs(tilePositionable.offset[i]) >= 1;

    if (hasReachedNextTile) {
      tilePositionable.pos[i] += dir;
      tilePositionable.offset[i] = 0;
    } else {
      tilePositionable.offset[i] += moveable.speed[i] * dir;
    }
  });
};

export default createSystem<AutoMoveable>(autoMovementSystem);
