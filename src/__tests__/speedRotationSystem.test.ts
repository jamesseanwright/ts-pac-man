import { speedRotationSystem } from '../speedRotationSystem';
import createSpeedRotatable from '../speedRotatable';
import createMoveable from '../moveable';
import createRotatable from '../rotatable';

describe('speedRotationSystem', () => {
  it('should rotate an entity based upon its speed', () => {
    const moveable = createMoveable(0, 1);
    const rotatable = createRotatable(0);
    const speedRotatable = createSpeedRotatable(moveable, rotatable);

    speedRotationSystem(speedRotatable);

    expect(rotatable.angle.toFixed(2)).toBe('1.57');
  });
});
