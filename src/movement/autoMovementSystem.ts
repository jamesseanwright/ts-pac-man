import { AutoMoveable } from './autoMoveable';
import createSystem from '../system';

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
