import { TrackingMoveable } from './trackingMoveable';
import { canMoveToTile } from '../map';
import { TilePositionable, Point2D } from '../tilePositionable';
import createSystem from '../system';
import { Moveable } from '../moveable';

/* Precedence follows that
 * of original game. */
const getNeighbouringTiles = ({
  pos: [column, row],
}: TilePositionable): Point2D[] => [
  [column, row - 1],
  [column - 1, row],
  [column, row + 1],
  [column + 1, row],
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
  neighbouringTiles: Point2D[],
  trackerPositionable: TilePositionable,
  target: TilePositionable,
  canMoveTo: typeof canMoveToTile,
): Point2D =>
  neighbouringTiles
    .filter(([col, row]) => canMoveTo(trackerPositionable, col, row))
    .sort((a, b) => getDistance(a, target.pos) - getDistance(b, target.pos))[0]

/* This acts upon both directions, but
 * given how getNeighbouringTiles works,
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
  const neighbouringTiles = getNeighbouringTiles(trackerPositionable);

  const closestTile = getClosestTileToTarget(
    neighbouringTiles,
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
