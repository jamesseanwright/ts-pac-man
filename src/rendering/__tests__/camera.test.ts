import createProject2D from '../camera';
import { TILE_WIDTH, TILE_HEIGHT } from '../../tilePositionable';

describe('project2D', () => {
  it('should return a fixed-length tuple array of values projected against the viewport', () => {
    const project2D = createProject2D(TILE_WIDTH * 1000, TILE_HEIGHT * 500);
    const projectedValues = project2D(1, 1, 4, 4);

    expect(projectedValues).toEqual([0.31329, 0.129605, 1.25316, 0.51842]);
  });
});
