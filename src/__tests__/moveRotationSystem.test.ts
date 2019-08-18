import { moveRotationSystem } from '../moveRotationSystem';
import createSpeedRotatable from '../movementRotatable';
import createMoveable from '../moveable';
import createRotatable from '../rotatable';

describe('moveRotationSystem', () => {
  it('should rotate an entity based upon its speed', () => {
    const moveable = createMoveable(0, 1, 1, 1);
    const rotatable = createRotatable(0);
    const speedRotatable = createSpeedRotatable(moveable, rotatable);

    moveRotationSystem(speedRotatable);

    expect(rotatable.angle.toFixed(2)).toBe('1.57');
  });
});
