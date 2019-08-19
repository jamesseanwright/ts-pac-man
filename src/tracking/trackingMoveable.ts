import { TilePositionable } from '../tilePositionable';
import { Moveable } from '../moveable';

export interface TrackingMoveable {
  trackerPositionable: TilePositionable;
  trackerMoveable: Moveable;
  targetPositionable: TilePositionable;
}

const createTrackingMoveable = (
  trackerPositionable: TilePositionable,
  trackerMoveable: Moveable,
  targetPositionable: TilePositionable,
): TrackingMoveable => ({
  trackerPositionable,
  trackerMoveable,
  targetPositionable,
});

export default createTrackingMoveable;
