export interface Positionable {
  // TODO: better name to incorporate width and height
  pos: [number, number];
  width: number;
  height: number;
}

const createPositionable = (
  x: number,
  y: number,
  width: number,
  height: number,
): Positionable => ({
  pos: [x, y],
  width,
  height,
});

export default createPositionable;
