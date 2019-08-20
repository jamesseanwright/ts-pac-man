import createTrackingMoveable from '../trackingMoveable';
import createTilePositionable, { TilePositionable } from '../../tilePositionable';
import createMoveable from '../../moveable';
import { createTrackingSystem } from '../trackingSystem';

describe('trackingSystem', () => {
  it('should set the tracker`s direction to the walkable map tile closest to the positionable that it`s targeting', () => {
    const trackerPositionable = createTilePositionable(3, 2, 1, 1);
    const trackerMoveable = createMoveable(0, 0, 1, 1);
    const targetPositionable = createTilePositionable(5, 7, 1, 1);

    const trackingMoveable = createTrackingMoveable(
      trackerPositionable,
      trackerMoveable,
      targetPositionable,
    );

    /* a stub that emulates
     * a real map layout */
    const canMoveTo = (
      currentPositionable: TilePositionable,
      column: number,
      row: number
    ) => row === 2 && column !== 3;

    const trackingSystem = createTrackingSystem(canMoveTo);

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([1, 0]);
  });

  it('should set the tracker`s direction to down when the closest walkable to the target is below', () => {
    const trackerPositionable = createTilePositionable(3, 2, 1, 1);
    const trackerMoveable = createMoveable(0, 0, 1, 1);
    const targetPositionable = createTilePositionable(9, 4, 1, 1);

    const trackingMoveable = createTrackingMoveable(
      trackerPositionable,
      trackerMoveable,
      targetPositionable,
    );

    const canMoveTo = (
      currentPositionable: TilePositionable,
      column: number,
      row: number
    ) => row !== 2 && column === 3;

    const trackingSystem = createTrackingSystem(canMoveTo);

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([0, 1]);
  });

  it('should set the tracker`s direction to left when the closest walkable to the target is behind', () => {
    const trackerPositionable = createTilePositionable(3, 2, 1, 1);
    const trackerMoveable = createMoveable(0, 0, 1, 1);
    const targetPositionable = createTilePositionable(2, 2, 1, 1);

    const trackingMoveable = createTrackingMoveable(
      trackerPositionable,
      trackerMoveable,
      targetPositionable,
    );

    const canMoveTo = (
      currentPositionable: TilePositionable,
      column: number,
      row: number
    ) => row === 2 && column !== 3;

    const trackingSystem = createTrackingSystem(canMoveTo);

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([-1, 0]);
  });
});
