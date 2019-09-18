/* 4x4px is the most atomic tile size.
 *
 * TODO: Use aspect ratio instead of
 * separate widths and heights. */

export type Point2D = [number, number];

export const tileSize: Point2D = [0.01769, 0.01613];

export interface TilePositionable {
  /* pos refers to tile numbers, not world spaces
   * TODO: make clearer in property naming?!
   * TODO: better name to incorporate width
   * and height. Width/height in tiles?! */
  pos: Point2D;
  offset: Point2D; // World space offset for transitions
  size: Point2D;
}

const createTilePositionable = (
  column: number,
  row: number,
  width: number,
  height: number,
): TilePositionable => ({
  pos: [column, row],
  offset: [0, 0],
  size: [width, height],
});

export default createTilePositionable;
