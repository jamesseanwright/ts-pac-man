import createTilePositionable, { TilePositionable } from '../tilePositionable';
import createSpriteRenderable, {
  SpriteRenderable,
} from '../rendering/spriteRenderable';
import createMoveable from '../moveable';
import { System } from '../system';
import createTrackingMoveable, {
  TrackingMoveable,
} from '../tracking/trackingMoveable';
import createAutoMoveable, { AutoMoveable } from '../movement/autoMoveable';

const bindBlinky = (
  spriteRenderSystem: System<SpriteRenderable>,
  trackingSystem: System<TrackingMoveable>,
  autoMovementSystem: System<AutoMoveable>,
  targetPositionable: TilePositionable,
) => {
  const positionable = createTilePositionable(45, 1, 3, 3);
  const moveable = createMoveable(0, 0, 0.23, 0.23);
  const autoMoveable = createAutoMoveable(positionable, moveable);
  const spriteRenderable = createSpriteRenderable('blinky', positionable);

  const trackingMoveable = createTrackingMoveable(
    positionable,
    moveable,
    targetPositionable,
  );

  (positionable as any).blinky = true;

  spriteRenderSystem.register(spriteRenderable);
  trackingSystem.register(trackingMoveable);
  autoMovementSystem.register(autoMoveable);
};

export default bindBlinky;
