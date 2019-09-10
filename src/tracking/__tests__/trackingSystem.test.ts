import createTrackingMoveable from '../trackingMoveable';
import createTilePositionable, {
  TilePositionable,
  Point2D,
} from '../../tilePositionable';
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
      [xDir, yDir]: Point2D,
    ) => xDir === 1 && yDir === 0;

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
      [xDir, yDir]: Point2D,
    ) => xDir === 0 && yDir === 1;

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
      [xDir, yDir]: Point2D,
    ) => xDir === -1 && yDir === 0;

    const trackingSystem = createTrackingSystem(canMoveTo);

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([-1, 0]);
  });

  it('should set the tracker`s direction to up when the closest walkable to the target is behind', () => {
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
      [xDir, yDir]: Point2D,
    ) => xDir === 0 && yDir === -1;

    const trackingSystem = createTrackingSystem(canMoveTo);

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([0, -1]);
  });

  it('should set the tracker`s direction to the closest when multiple tiles are walkable', () => {
    const trackerPositionable = createTilePositionable(3, 2, 1, 1);
    const trackerMoveable = createMoveable(0, 0, 1, 1);
    const targetPositionable = createTilePositionable(2, 2, 1, 1);

    const trackingMoveable = createTrackingMoveable(
      trackerPositionable,
      trackerMoveable,
      targetPositionable,
    );

    // Either right or down
    const canMoveTo = (
      currentPositionable: TilePositionable,
      [xDir, yDir]: Point2D,
    ) => (xDir === 1 && yDir === 0) || (xDir === 0 && yDir === 1);

    const trackingSystem = createTrackingSystem(canMoveTo);

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([0, 1]);
  });

  it('should not update the direction if the track positionable has an offset', () => {
    const trackerPositionable = createTilePositionable(3, 2, 1, 1);
    const trackerMoveable = createMoveable(0, 0, 1, 1);
    const targetPositionable = createTilePositionable(2, 2, 1, 1);

    const trackingMoveable = createTrackingMoveable(
      trackerPositionable,
      trackerMoveable,
      targetPositionable,
    );

    const canMoveTo = () => true;
    const trackingSystem = createTrackingSystem(canMoveTo);

    trackerPositionable.offset = [0.2, 0.2];

    trackingSystem(trackingMoveable);

    expect(trackingMoveable.trackerMoveable.direction).toEqual([0, 0]);
  });
});
