import { TrackingMoveable } from './trackingMoveable';
import { canMoveToTile } from '../map';
import { TilePositionable } from '../tilePositionable';

const getNeighbouringTiles = ({ pos: [column, row] }: TilePositionable): [number, number][] =>
  [[column - 1, row], [column + 1, row], [column, row - 1], [column, row + 1]];

const getDistance = ([ax, ay]: [number, number], [bx, by]: [number, number]) =>
  (bx + by) - (ax + ay);

/* Retrieves the tile with the *smallest*
 * aggregate distance from the tracker */
const getClosestTileToTarget = (neighbouringTiles: [number, number][], target: TilePositionable): [number, number] =>
  neighbouringTiles.sort(
    (a, b) => getDistance(a, target.pos) - getDistance(b, target.pos)
  )[0];

/* This acts upon both directions, but
 * given how getNeighbouringTiles works,
 * we can safely assume that only one scalar
 * will be greater than zero.
 * TODO: find a succinct, mathsy way of
 * expressing this (I'm tired...) */
const getDirectionToClosestTile = ({ pos }: TilePositionable, tile: [number, number]) =>
  pos.map((p, i) => {
    if (p < tile[i]) {
      return 1;
    }

    if (p > tile[i]) {
      return -1;
    }

    return 0;
  }) as [number, number];

export const createTrackingSystem = (canMoveTo: typeof canMoveToTile) =>
  ({ trackerPositionable, trackerMoveable, targetPositionable }: TrackingMoveable) => {
    const neighbouringTiles = getNeighbouringTiles(trackerPositionable);
    console.log('*******', neighbouringTiles);
    const closestTile = getClosestTileToTarget(neighbouringTiles, targetPositionable);
    console.log('*******', closestTile);
    const direction = getDirectionToClosestTile(trackerPositionable, closestTile);

    direction.forEach((dir, i) => {
      trackerMoveable.direction[i] = dir;
    });
  };

export default createTrackingSystem(canMoveToTile);
