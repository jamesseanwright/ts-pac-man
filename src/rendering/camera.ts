import { TILE_WIDTH, TILE_HEIGHT, TilePositionable } from '../tilePositionable';

/* TODO: make this nomenclature
 * reference tile sizes somehow */

export type Points2D = [number, number, number, number];

export type Project2D = (tilePositionable: TilePositionable) => Points2D;

const createProject2D = (viewportWidth: number, viewportHeight: number) => (
  { pos, offset, width, height }: TilePositionable, // TODO: make width and height pseudo-vector?
): Points2D => [
  // Yeah, this impl is definitely tailored for tile systems
  (pos[0] + offset[0]) * TILE_WIDTH * viewportWidth,
  (pos[1] + offset[1]) * TILE_HEIGHT * viewportHeight,
  width * TILE_WIDTH * viewportWidth,
  height * TILE_HEIGHT * viewportHeight,
];

export default createProject2D;
