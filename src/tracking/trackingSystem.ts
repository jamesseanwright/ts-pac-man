import { TrackingMoveable } from './trackingMoveable';
import { canMoveToTile } from '../map';
import { TilePositionable, Point2D } from '../tilePositionable';
import createSystem from '../system';
import { addVectors, isNegationOfVector } from '../vectors';

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
  // TODO: move to vectors#subtractVectors
  const displacement = b.map((p, i) => p - a[i]);

  return Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0));
};

/* When filtering directions, we
 * negate the current direction to
 * prevent entities from reversing
 * when the current path is clear. */
const getDirectionToClosestTile = (
  possibleDirections: Point2D[],
  {
    trackerPositionable,
    trackerMoveable,
    targetPositionable,
  }: TrackingMoveable,
  canMoveTo: typeof canMoveToTile,
): Point2D =>
  possibleDirections
    .filter(
      direction =>
        !isNegationOfVector(direction, trackerMoveable.direction) &&
        canMoveTo(trackerPositionable, direction),
    )
    .sort(
      (a, b) =>
        getDistance(
          addVectors(trackerPositionable.pos, a),
          targetPositionable.pos,
        ) -
        getDistance(
          addVectors(trackerPositionable.pos, b),
          targetPositionable.pos,
        ),
    )[0] || [0, 0];

const hasOffset = ({ offset }: TilePositionable) => offset.some(o => o !== 0);

export const createTrackingSystem = (canMoveTo: typeof canMoveToTile) => (
  trackingMoveable: TrackingMoveable,
) => {
  if (hasOffset(trackingMoveable.trackerPositionable)) {
    return;
  }

  const possibleDirections = getPossibleDirections();

  const direction = getDirectionToClosestTile(
    possibleDirections,
    trackingMoveable,
    canMoveTo,
  );

  direction.forEach((dir, i) => {
    trackingMoveable.trackerMoveable.direction[i] = dir;
  });
};

export default createSystem<TrackingMoveable>(
  createTrackingSystem(canMoveToTile),
);
