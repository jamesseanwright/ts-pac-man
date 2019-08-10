import createProject2D from '../camera';

describe('project2D', () => {
  it('should return a fixed-length tuple array of values projected against the viewport', () => {
    const project2D = createProject2D(1280, 1080);
    const projectedValues = project2D(0.5, 0.5, 0.02, 0.02);
    expect(projectedValues).toEqual([640, 540, 25.6, 21.6]);
  });
});
