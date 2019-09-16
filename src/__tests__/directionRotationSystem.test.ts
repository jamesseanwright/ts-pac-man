import { directionRotationSystem } from '../directionRotationSystem';
import createSpeedRotatable from '../directionRotatable';
import createMoveable from '../moveable';
import createRotatable from '../rotatable';

describe('directionRotationSystem', () => {
  it('should rotate an entity based upon its speed', () => {
    const moveable = createMoveable(0, 1, 1, 1);
    const rotatable = createRotatable(0);
    const speedRotatable = createSpeedRotatable(moveable, rotatable);

    directionRotationSystem(speedRotatable);

    expect(rotatable.angle.toFixed(2)).toBe('1.57');
  });
});
