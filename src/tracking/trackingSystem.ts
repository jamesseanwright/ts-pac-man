import { TrackingMoveable } from './trackingMoveable';
import { canMoveToTile } from '../map';
import { TilePositionable } from '../tilePositionable';

const getNeighbouringTiles = ({ pos: [column, row] }: TilePositionable): [number, number][] =>
  [[column - 1, row], [column + 1, row], [column, row - 1], [column, row + 1]];

const getClosestTileToTarget = (neighbouringTiles: [number, number][], target: TilePositionable): [number, number] =>
  [-1, -1];

const getDirectionToClosestTile = (tile: [number, number]) =>
  [-1, -1];

export const createTrackingSystem = (canMoveTo: typeof canMoveToTile) =>
  ({ trackerPositionable, trackerMoveable, targetPositionable }: TrackingMoveable) => {
    const neighbouringTiles = getNeighbouringTiles(trackerPositionable);
    const closestTile = getClosestTileToTarget(neighbouringTiles, targetPositionable);
    const direction = getDirectionToClosestTile(closestTile);

    direction.forEach((dir, i) => {
      trackerMoveable.direction[i] = dir;
    });
  };

export default createTrackingSystem(canMoveToTile);
