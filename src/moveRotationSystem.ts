/* TODO: rename `input` dir to
 * `movement` and move this there */

import { MovementRotatable } from './movementRotatable';
import createSystem from './system';

export const moveRotationSystem = ({
  moveable,
  rotatable,
}: MovementRotatable) => {
  rotatable.angle = Math.atan2(moveable.direction[1], moveable.direction[0]);
};

export default createSystem<MovementRotatable>(moveRotationSystem);
