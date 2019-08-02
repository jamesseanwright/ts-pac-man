type Points2D = [number, number, number, number];

export type Project2D = (viewportWidth: number, viewportHeight: number, x: number, y: number, width: number, height: number) => Points2D;

const project2D = (viewportWidth: number, viewportHeight: number, x: number, y: number, width: number, height: number): Points2D =>
  [x * viewportWidth, y * viewportHeight, width * viewportWidth, height * viewportHeight];

export default project2D;
