import createProject2D from '../camera';
import createTilePositionable, {
  TILE_WIDTH,
  TILE_HEIGHT,
} from '../../tilePositionable';

describe('project2D', () => {
  it('should return a fixed-length tuple array of the positionable projected against the viewport', () => {
    const project2D = createProject2D(TILE_WIDTH * 1000, TILE_HEIGHT * 500);
    const tilePositionable = createTilePositionable(1, 1, 4, 4);
    const projectedValues = project2D(tilePositionable);

    expect(projectedValues).toEqual([0.31329, 0.129605, 1.25316, 0.51842]);
  });
});
