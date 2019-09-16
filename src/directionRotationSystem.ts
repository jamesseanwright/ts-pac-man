/* TODO: rename `input` dir to
 * `movement` and move this there */

import { DirectionRotatable } from './directionRotatable';
import createSystem from './system';

export const directionRotationSystem = ({
  moveable,
  rotatable,
}: DirectionRotatable) => {
  rotatable.angle = Math.atan2(moveable.direction[1], moveable.direction[0]);
};

export default createSystem<DirectionRotatable>(directionRotationSystem);
