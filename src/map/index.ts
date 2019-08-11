import spriteRenderSystem from '../rendering/spriteRenderSystem';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';
import createPositionable from '../positionable';
import createRotatable from '../rotatable';

/* 4x4px is the most atomic tile size.
 *
 * TODO: Use aspect ratio instead of
 * separate widths and heights. */
const TILE_WIDTH = 0.0177;
const TILE_HEIGHT = 0.0161;

/* Numbers next to tile type represent rotation
 * by increments of 1.57 rad/90 deg
 * i.e. 0 => 0, 1 => 1.57, 2 => 3.14, 3 => 4.71 */
type OuterCorner = 'A0' | 'A1' | 'A2' | 'A3';
type InnerCorner = 'B0' | 'B1' | 'B2' | 'B3';
type StraightWall = 'C0' | 'C1';
type StraightSingleWall = 'D0' | 'D1' | 'D2' | 'D3';
type SingleInnerCorner = 'E0' | 'E1' | 'E2' | 'E3';
type SquareCorner = 'F0' | 'F1' | 'F2' | 'F3';
type SplittingCorner = 'G0' | 'G1' | 'G2' | 'G3';
type Gate = 'H';
type Walkable = 'O';

type Tile =
  | OuterCorner
  | InnerCorner
  | StraightWall
  | StraightSingleWall
  | SingleInnerCorner
  | SquareCorner
  | SplittingCorner
  | Gate
  | Walkable;

// TODO: resolve implicit any in return
const fill = (length: number, tile: Tile | Tile[]) => Array(length).fill(tile);

const standardWalkway = fill(4, 'O');

const tiles: Tile[][] = [
  ['A0', ...fill(25, 'C0'), 'G1', 'D0', 'G0', ...fill(25, 'C0'), 'A1'],
  ...fill(4, ['C1', ...fill(54, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'B0', ...fill(6, 'D0'), 'B1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B0', ...fill(6, 'D0'), 'B1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'C1'],
  ...fill(2, ['C1', ...fill(4, 'O'), 'D3', ...fill(4, 'O'), 'D1', ...fill(4, 'O'), 'D3', ...fill(6, 'O'), 'D1', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'D3', ...fill(6, 'O'), 'D1', ...fill(4, 'O'), 'D3', ...fill(4, 'O'), 'D1', ...fill(4, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'B3', ...fill(6, 'D2'), 'B2', ...fill(4, 'O'), 'B3', 'B2', ...fill(4, 'O'), 'B3', ...fill(6, 'D2'), 'B2', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'C1'],
  ...fill(4, ['C1', ...fill(54, 'O'), 'C1']),
  ['C1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'B0', ...fill(12, 'D0'), 'B1', ...fill(4, 'O'), 'B0', 'B1', ...fill(4, 'O'), 'B0', ...fill(4, 'D0'), 'B1', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), ...fill(4, 'O'), ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'D3', 'D1', ...fill(4, 'O'), 'B3', ...fill(4, 'D2'), 'B2', ...fill(4, 'O'), 'C1'],
  ['C1', ...fill(14, 'O'), 'D3', 'D1', ...fill(9, 'O'), 'B1', ...fill(2, 'O'), 'B0', ...fill(9, 'O'), 'D3', 'D1', ...fill(14, 'O'), 'C1'],
  ...fill(3, ['C1', ...fill(14, 'O'), 'D3', 'D1', ...fill(10, 'O'), 'D3', 'D1', ...fill(10, 'O'), 'D3', 'D1', ...fill(14, 'O'), 'C1']),
];

const isWalkable = (tile: Tile): tile is Walkable => tile === 'O';

const toRadians = (rawRotation: string) => {
  const rotation = parseInt(rawRotation, 10);
  return rotation * 1.57;
};

// TODO: Should this live under entities?
// TODO: Test!
const bindMap = (spriteRenderSystem: System<SpriteRenderable>) => {
  tiles.forEach((rowTiles, row) => {
    rowTiles.forEach((tile, column) => {
      if (isWalkable(tile)) {
        return;
      }

      const [type, rotation = '0'] = tile;

      const positionable = createPositionable(
        column * TILE_WIDTH,
        row * TILE_HEIGHT,
        TILE_WIDTH,
        TILE_HEIGHT,
      );

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

export default bindMap;
