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

  return Math.sqrt(
    displacement.reduce((dis, p) => dis + p * p, 0),
  );
};

/* Retrieves the tile with the *smallest*
 * aggregate distance from the tracker.
 * We can simply take the closest tile
 * that's actually moveable. */
const getClosestTileToTarget = (
  possibleDirections: Point2D[],
  trackerPositionable: TilePositionable,
  target: TilePositionable,
  canMoveTo: typeof canMoveToTile,
): Point2D =>
  possibleDirections
    .filter(direction => canMoveTo(trackerPositionable, direction))
    .map(direction => addVectors(trackerPositionable.pos, direction) as Point2D)
    .sort((a, b) => getDistance(a, target.pos) - getDistance(b, target.pos))[0]

/* This acts upon both directions, but
 * given how getPossibleDirections works,
 * we can safely assume that only one scalar
 * will be greater than zero.
 * TODO: find a succinct, mathsy way of
 * expressing this (I'm tired...) */
const getDirectionToClosestTile = (
  { pos }: TilePositionable,
  tile: Point2D,
) =>
  pos.map((p, i) => {
    if (p < tile[i]) {
      return 1;
    }

    if (p > tile[i]) {
      return -1;
    }

    return 0;
  });

const hasOffset = ({ offset }: TilePositionable) =>
  offset.some(o => o !== 0);

export const createTrackingSystem = (canMoveTo: typeof canMoveToTile) => ({
  trackerPositionable,
  trackerMoveable,
  targetPositionable,
}: TrackingMoveable) => {
  const possibleDirections = getPossibleDirections();

  const closestTile = getClosestTileToTarget(
    possibleDirections,
    trackerPositionable,
    targetPositionable,
    canMoveTo,
  );

  /* We don't want to change direction
   * when transitioning between tiles */
  if (hasOffset(trackerPositionable)) {
    return;
  }

  const direction = getDirectionToClosestTile(trackerPositionable, closestTile);

  direction.forEach((dir, i) => {
    trackerMoveable.direction[i] = dir;
  });
};

export default createSystem<TrackingMoveable>(
  createTrackingSystem(canMoveToTile),
);
