import spriteRenderSystem from '../rendering/spriteRenderSystem';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import { System } from '../system';
import createPositionable from '../positionable';

/* 4x4px is the most atomic tile size,
 * but a single walkable tile is 16x16,
 * so these are recognised as being larger
 * to make movement logic more simple.
 *
 * TODO: Use aspect ratio instead of
 * separate widths and heights. */
const TILE_WIDTH = 0.0176;
const TILE_HEIGHT = 0.0161;
const WALKABLE_WIDTH = TILE_WIDTH * 4;
const WALKABLE_HEIGHT = TILE_HEIGHT * 4;

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

const fill = (length: number, tile: Tile): Tile[] => Array(length).fill(tile);

const tiles: Tile[][] = [
  ['A0', ...fill(25, 'C0'), 'G1', 'D0', 'G0', ...fill(25, 'C0'), 'A1'],
];

// TODO: Should this live under entities?
const bindMap = (spriteRenderSystem: System<SpriteRenderable>) => {
  tiles.forEach((rowTiles, row) => {
    rowTiles.forEach((tile, column) => {
      const [type, rotation = '0'] = tile;

      const positionable = createPositionable(
        column * TILE_WIDTH,
        row * TILE_HEIGHT,
        TILE_WIDTH,
        TILE_HEIGHT,
      );

      const spriteRenderable = createSpriteRenderable(type, positionable);

      spriteRenderSystem.register(spriteRenderable);
    });
  });
};

export default bindMap;
