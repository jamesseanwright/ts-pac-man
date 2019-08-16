import { TILE_WIDTH, TILE_HEIGHT } from "../tilePositionable";

/* TODO: make this nomenclature
 * reference tile sizes somehow */

export type Points2D = [number, number, number, number];

export type Project2D = (
  x: number,
  y: number,
  width: number,
  height: number,
) => Points2D;

const createProject2D = (viewportWidth: number, viewportHeight: number) => (
  x: number,
  y: number,
  width: number,
  height: number,
): Points2D => [
  // Yeah, this impl is definitely tailored for tile systems
  x * TILE_WIDTH * viewportWidth,
  y * TILE_HEIGHT * viewportHeight,
  width * TILE_WIDTH * viewportWidth,
  height * TILE_HEIGHT * viewportHeight,
];

export default createProject2D;
