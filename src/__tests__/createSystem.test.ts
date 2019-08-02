import createSystem from '../system';

interface TestComponent {
  i: number;
}

describe('createSystem', () => {
  it('should create a system that calls a delegate update function for each provided component', () => {
    const next = jest.fn();
    const components = Array(5)
      .fill(null)
      .map((_, i) => ({ i }));
    const system = createSystem<TestComponent>(components, next);
    const time = 2000;

    system(time);

    expect(next).toHaveBeenCalledTimes(components.length);

    components.forEach(component => {
      expect(next).toHaveBeenCalledWith(component, time);
    });
  });
});
