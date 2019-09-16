import { Moveable } from './moveable';
import { Rotatable } from './rotatable';

/* A component for rotations
 * based upon direction */

export interface DirectionRotatable {
  moveable: Moveable;
  rotatable: Rotatable;
}

const createDirectionRotatable = (
  moveable: Moveable,
  rotatable: Rotatable,
): DirectionRotatable => ({
  moveable,
  rotatable,
});

export default createDirectionRotatable;
