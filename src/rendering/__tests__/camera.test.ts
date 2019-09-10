import createProject2D from '../camera';

import createTilePositionable, {
  tileSize, Point2D,
} from '../../tilePositionable';

describe('project2D', () => {
  it('should return a fixed-length tuple array of the positionable projected against the viewport', () => {
    const project2D = createProject2D(tileSize.map((s, i) => s * i === 0 ? 1000 : 500) as Point2D);
    const tilePositionable = createTilePositionable(1, 1, 4, 4);
    const projectedValues = project2D(tilePositionable);

    expect(projectedValues).toEqual([17.7, 8.05, 70.8, 32.2]);
  });
});
