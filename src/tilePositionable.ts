/* 4x4px is the most atomic tile size.
 *
 * TODO: Use aspect ratio instead of
 * separate widths and heights. */
export const TILE_WIDTH = 0.0177;
export const TILE_HEIGHT = 0.0161;

export interface TilePositionable {
  /* pos refers to tile numbers, not world spaces
   * TODO: make clearer in property naming?!
   * TODO: better name to incorporate width
   * and height. Width/height in tiles?! */
  pos: [number, number];
  width: number; // Multiple of TILE_WIDTH
  height: number; // Multiple of TILE_HEIGHT
}

const createTilePositionable = (
  column: number,
  row: number,
  width: number,
  height: number,
): TilePositionable => ({
  pos: [column, row],
  width,
  height,
});

export default createTilePositionable;