import { Moveable } from './moveable';
import { Rotatable } from './rotatable';
/* A component for rotations
 * based upon speed */

export interface SpeedRotatable {
  moveable: Moveable;
  rotatable: Rotatable;
}

const createSpeedRotatable = (moveable: Moveable, rotatable: Rotatable): SpeedRotatable => ({
  moveable,
  rotatable,
});

export default createSpeedRotatable;
