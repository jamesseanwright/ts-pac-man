/* Walkable tiles are seemingly
 * 16x16, but the edge walls are
 * 4x smaller. With this in mind,
 * 4x4 is the most atomic tile size.
 *
 * Numbers next to tile type represent
 * rotation by increments of 1.57 rad/90 deg
 * i.e. 0 => 0, 1 => 1.57, 2 => 3.14, 3 => 4.71
 */

type OuterCorner = 'A0' | 'A1' | 'A2' | 'A3';
type InnerCorner = 'B0' | 'B1' | 'B2' | 'B3';
type StraightWall = 'C0' | 'C1';
type StraightSingleWall = 'D0' | 'D1';
type SingleInnerCorner = 'E0' | 'E1' | 'E2' | 'E3';
type SquareCorner = 'F0' | 'F1' | 'F2' | 'F3';
type Gate = 'G0';
type Walkable = '[]';

type Tile =
  | OuterCorner
  | InnerCorner
  | StraightWall
  | StraightSingleWall
  | SingleInnerCorner
  | SquareCorner
  | Gate
  | Walkable;

const map: Tile[][] = [
  []
];
