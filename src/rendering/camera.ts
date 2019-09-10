import { tileSize, TilePositionable, Point2D } from '../tilePositionable';
import { addVectors, multiplyVectors } from '../vectors';

export type Points2D = [number, number, number, number];
export type Project2D = (tilePositionable: TilePositionable) => Points2D;

const createProject2D = (viewport: Point2D) => (
  { pos, offset, size }: TilePositionable,
): Points2D => [
  // Yeah, this impl is definitely tailored for tile systems
  ...multiplyVectors(addVectors(pos, offset), tileSize, viewport),
  ...multiplyVectors(size, tileSize, viewport),
] as Points2D;

export default createProject2D;
