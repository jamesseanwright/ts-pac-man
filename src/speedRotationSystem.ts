/* TODO: rename `input` dir to
 * `movement` and move this there */

import { SpeedRotatable } from './speedRotatable';

export const speedRotationSystem = ({ moveable, rotatable }: SpeedRotatable) => {
  rotatable.angle = Math.atan2(moveable.speed[1], moveable.speed[0]);
};
