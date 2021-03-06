import createSpriteRenderable, {
  SpriteRenderable,
} from './rendering/spriteRenderable';
import createTilePositionable, {
  TilePositionable,
  Point2D,
} from './tilePositionable';
import createRotatable from './rotatable';
import { System } from './system';
import { addVectors, ceilingVector } from './vectors';

/* Numbers next to tile type represent rotation
 * by increments of 1.57 rad/90 deg
 * i.e. 0 => 0, 1 => 1.57, 2 => 3.14, 3 => 4.71 */

type OuterCorner = 'A0' | 'A1' | 'A2' | 'A3';
type InnerCorner = 'B0' | 'B1' | 'B2' | 'B3';
type StraightWall = 'C0' | 'C1';
type StraightSingleWall = 'D0' | 'D1' | 'D2' | 'D3';
type SingleInnerCorner = 'E0' | 'E1' | 'E2' | 'E3';
type SquareCorner = 'F0' | 'F1' | 'F2' | 'F3';
type Gate = 'H';
type Walkable = 'O';

export type Tile =
  | OuterCorner
  | InnerCorner
  | StraightWall
  | StraightSingleWall
  | SingleInnerCorner
  | SquareCorner
  | Gate
  | Walkable;

// TODO: resolve implicit any in return
const fill = (length: number, tile: Tile | Tile[]) => Array(length).fill(tile);

// prettier-ignore
const tiles: Tile[][] = [
  ['A0', ...fill(25, 'C0'), ...fill(4, 'D0'), ...fill(25, 'C0'), 'A1'],
  ['C1', ...fill(25, 'O'), 'B1', ...fill(2, 'O'), 'B0', ...fill(25, 'O'), 'C1'],
  ...fill(3, ['C1', ...fill(26, 'O'), 'D3', 'D1', ...fill(26, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'B0', ...fill(6, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(6, 'D0'), 'B1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'C1'],
  ...fill(2, ['C1', ...fill(4, 'O'), 'D3', ...fill(4, 'O'), 'D1', ...fill(4, 'O'), 'D3', ...fill(6, 'O'), 'D1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'D3', ...fill(6, 'O'), 'D1', ...fill(4, 'O'), 'D3', ...fill(4, 'O'), 'D1', ...fill(4, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'B3', ...fill(6, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'B3', ...fill(6, 'D2'), 'B2', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'C1'],
  ...fill(4, ['C1', ...fill(54, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'B0', ...fill(12, 'D0'), 'B1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), ...fill(4, 'O'), ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(14, 'O'), 'D3', 'D1', ...fill(9, 'O'), 'B1', ...fill(2, 'O'), 'B0', ...fill(9, 'O'), 'D3', 'D1', ...fill(14, 'O'), 'C1'],
  ...fill(2, ['C1', ...fill(14, 'O'), 'D3', 'D1', ...fill(10, 'O'), 'D3', 'D1', ...fill(10, 'O'), 'D3', 'D1', ...fill(14, 'O'), 'C1']),
  ['C1', ...fill(14, 'O'), 'D3', 'O', 'B3', ...fill(9, 'O'), 'D3', 'D1', ...fill(9, 'O'), 'B2', 'O', 'D1', ...fill(14, 'O'), 'C1'],
  ['A3', ...fill(9, 'C0'), 'A1', ...fill(4, 'O'), 'D3', ...fill(2, 'O'), ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), ...fill(2, 'O'), "D1", ...fill(4, 'O'), 'A0', ...fill(9, 'C0'), 'A2'],
  [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', ...fill(2, 'O'), ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), "B3", ...fill(4, 'D2'), ...fill(2, 'O'), 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')],
  [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', 'O', 'B0', ...fill(20, 'O'), 'B1', 'O', 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')],
  ...fill(3, [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', 'D1', ...fill(22, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')]),
  [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'F0', ...fill(4, 'C0'), ...fill(4, 'H'), ...fill(4, 'C0'), 'F1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')],
  [...fill(10, 'C0'), 'A2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'C1', ...fill(12, 'O'), 'C1', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'A3', ...fill(10, 'C0')],
  ...fill(4, [...fill(21, 'O'), 'C1', ...fill(12, 'O'), 'C1', ...fill(21, 'O')]),
  [...fill(10, 'C0'), 'A1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'C1', ...fill(12, 'O'), 'C1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'A0', ...fill(10, 'C0')],
  [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'F3', ...fill(12, 'C0'), 'F2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')],
  ...fill(4, [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', 'D1', ...fill(22, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')]),
  [...fill(10, 'O'), 'C1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(12, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'C1', ...fill(10, 'O')],
  ['A0', ...fill(9, 'C0'), 'A2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), ...fill(4, 'O'), ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'A3', ...fill(9, 'C0'), 'A1'],
  ['C1', ...fill(25, 'O'), 'B1', ...fill(2, 'O'), 'B0', ...fill(25, 'O'), 'C1'],
  ...fill(3, ['C1', ...fill(26, 'O'), 'D3', 'D1', ...fill(26, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'B0', ...fill(6, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(6, 'D0'), 'B1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(4, 'O'), 'B3', ...fill(2, 'D2'), ...fill(2, 'O'), 'D1', ...fill(4, 'O'), 'B3', ...fill(6, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'B3', ...fill(6, 'D2'), 'B2', ...fill(4, 'O'), 'D3', ...fill(2, 'O'), ...fill(2, 'D2'), 'B2', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(7, 'O'), 'B1', 'O', 'D1', ...fill(34, 'O'), 'D3', 'O', 'B0', ...fill(7, 'O'), 'C1'],
  ...fill(2, ['C1', ...fill(8, 'O'), 'D3', 'D1', ...fill(34, 'O'), 'D3', 'D1', ...fill(8, 'O'), 'C1']),
  ['D3', 'B3', ...fill(7, 'O'), 'D3', 'D1', ...fill(34, 'O'), 'D3', 'D1', ...fill(7, 'O'), 'B2', 'D1'],
  ['D3', 'O', ...fill(2, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'B0', ...fill(12, 'D0'), 'B1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(2, 'D0'), 'O', 'D1'],
  ['D3', 'O', ...fill(2, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), ...fill(4, 'O'), ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'B3', ...fill(2, 'D2'), 'O', 'D1'],
  ['D3', 'B0', ...fill(13, 'O'), 'D3', 'D1', ...fill(9, 'O'), 'B1', ...fill(2, 'O'), 'B0', ...fill(9, 'O'), 'D3', 'D1', ...fill(13, 'O'), 'B1', 'D1'],
  ...fill(2, ['C1', ...fill(14, 'O'), 'D3', 'D1', ...fill(10, 'O'), 'D3', 'D1', ...fill(10, 'O'), 'D3', 'D1', ...fill(14, 'O'), 'C1']),
  ['C1', ...fill(13, 'O'), 'B2', ...fill(2, 'O'), 'B3', ...fill(9, 'O'), 'D3', 'D1', ...fill(9, 'O'), 'B2', ...fill(2, 'O'), 'B3', ...fill(13, 'O'), 'C1'],
  ['C1', ...fill(4, 'O'), 'B0', ...fill(8, 'D0'), ...fill(4, 'O'), ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), ...fill(4, 'O'), ...fill(8, 'D0'), 'B1', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(4, 'O'), 'B3', ...fill(16, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'B3', ...fill(16, 'D2'), 'B2', ...fill(4, 'O'), 'C1'],
  ...fill(4, ['C1', ...fill(54, 'O'), 'C1']),
  ['A3', ...fill(54, 'C0'), 'A2'],
];

// TODO: corners probably need to be walkable...
const isWalkable = (tile: Tile): tile is Walkable => tile === 'O';

export const toRadians = (rawRotation: string) => {
  const rotation = parseInt(rawRotation, 10);
  return rotation * 1.57;
};

// TODO: Should this live under entities?
export const createMapBinder = (map: Tile[][]) => (
  spriteRenderSystem: Pick<System<SpriteRenderable>, 'register'>,
) => {
  map.forEach((rowTiles, row) => {
    rowTiles.forEach((tile, column) => {
      if (isWalkable(tile)) {
        return;
      }

      const [type, rotation = '0'] = tile;
      const positionable = createTilePositionable(column, row, 1, 1);
      const rotatable = createRotatable(toRadians(rotation));

      const spriteRenderable = createSpriteRenderable(
        type,
        positionable,
        rotatable,
      );

      spriteRenderSystem.register(spriteRenderable);
    });
  });
};

const getSizeOffset = (direction: number[], size: number[]) =>
  direction.map((d, i) => (d === 1 ? size[i] - 1 : 0));

export const createCanMoveToTile = (map: Tile[][]) => (
  currentPositionable: TilePositionable,
  direction: Point2D,
) => {
  const { pos, size, offset } = currentPositionable;

  const [targetColumn, targetRow] = addVectors(
    pos,
    ceilingVector(offset),
    direction,
    getSizeOffset(direction, size),
  );

  return isWalkable(map[targetRow][targetColumn]);
};

export const canMoveToTile = createCanMoveToTile(tiles);

export default createMapBinder(tiles);
