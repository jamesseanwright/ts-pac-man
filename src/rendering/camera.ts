type Points2D = [number, number, number, number];

export type Project2D = (outputWidth: number, outputHeight: number, x: number, y: number, width: number, height: number) => Points2D;

const project2D = (outputWidth: number, outputHeight: number, x: number, y: number, width: number, height: number): Points2D =>
  [x * outputWidth, y * outputHeight, width * outputWidth, height * outputHeight];

export default project2D;
