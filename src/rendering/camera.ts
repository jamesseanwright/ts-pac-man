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
  x * viewportWidth,
  y * viewportHeight,
  width * viewportWidth,
  height * viewportHeight,
];

export default createProject2D;
