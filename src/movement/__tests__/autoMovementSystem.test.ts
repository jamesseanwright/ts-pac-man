import { autoMovementSystem } from '../autoMovementSystem';
import createTilePositionable from '../../tilePositionable';
import createMoveable from '../../moveable';
import createAutoMoveable from '../autoMoveable';

describe('autoMovementSystem', () => {
  it('should move the component`s tilePositionable per call based upon its moveable', () => {
    const tilePositionable = createTilePositionable(2, 2, 1, 1);
    const moveable = createMoveable(1, 1, 0.5, 0.5);
    const autoMoveable = createAutoMoveable(tilePositionable, moveable);

    autoMovementSystem(autoMoveable);

    expect(tilePositionable.pos).toEqual([2, 2]);
    expect(tilePositionable.offset).toEqual([0.5, 0.5]);

    autoMovementSystem(autoMoveable);
    autoMovementSystem(autoMoveable);

    expect(tilePositionable.pos).toEqual([3, 3]);
    expect(tilePositionable.offset).toEqual([0, 0]);
  });
});
