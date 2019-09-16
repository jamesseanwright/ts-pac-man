import { TrackingMoveable } from './trackingMoveable';
import { canMoveToTile } from '../map';
import { TilePositionable, Point2D } from '../tilePositionable';
import createSystem from '../system';
import { addVectors } from '../vectors';

/* Precedence follows that
 * of original game. */
const getPossibleDirections = (): Point2D[] => [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];

// This is Euclidian distance: /wiki/Euclidean_distance
const getDistance = (a: Point2D, b: Point2D) => {
  const displacement = b.map((p, i) => p - a[i]);

  return Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0));
};

const getDirectionToClosestTile = (
  possibleDirections: Point2D[],
  trackerPositionable: TilePositionable,
  target: TilePositionable,
  canMoveTo: typeof canMoveToTile,
): Point2D =>
  possibleDirections
    .filter(direction => canMoveTo(trackerPositionable, direction))
    .sort(
      (a, b) =>
        getDistance(addVectors(trackerPositionable.pos, a), target.pos) -
        getDistance(addVectors(trackerPositionable.pos, b), target.pos),
    )[0];

const hasOffset = ({ offset }: TilePositionable) => offset.some(o => o !== 0);

export const createTrackingSystem = (canMoveTo: typeof canMoveToTile) => ({
  trackerPositionable,
  trackerMoveable,
  targetPositionable,
}: TrackingMoveable) => {
  /* We only want to change the
   * direction once the current
   * path is no longer walkable
   * i.e. there's a wall. */
  if (hasOffset(trackerPositionable) || canMoveTo(trackerPositionable, trackerMoveable.direction)) {
    return;
  }

  const possibleDirections = getPossibleDirections();

  const direction = getDirectionToClosestTile(
    possibleDirections,
    trackerPositionable,
    targetPositionable,
    canMoveTo,
  );

  direction.forEach((dir, i) => {
    trackerMoveable.direction[i] = dir;
  });
};

export default createSystem<TrackingMoveable>(
  createTrackingSystem(canMoveToTile),
);
