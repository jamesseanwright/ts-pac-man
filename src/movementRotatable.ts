import { Moveable } from './moveable';
import { Rotatable } from './rotatable';
/* A component for rotations
 * based upon speed */

export interface MovementRotatable {
  moveable: Moveable;
  rotatable: Rotatable;
}

const createMovementRotatable = (
  moveable: Moveable,
  rotatable: Rotatable,
): MovementRotatable => ({
  moveable,
  rotatable,
});

export default createMovementRotatable;
