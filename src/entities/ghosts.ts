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

// [name, column, row]
type GhostDefinition = [string, number, number];

const ghosts: GhostDefinition[] = [
  ['blinky', 45, 1],
  ['pinky', 5, 1],
];

const bindGhost = (
  [name, column, row]: GhostDefinition,
  spriteRenderSystem: System<SpriteRenderable>,
  trackingSystem: System<TrackingMoveable>,
  autoMovementSystem: System<AutoMoveable>,
  targetPositionable: TilePositionable,
) => {
  const positionable = createTilePositionable(column, row, 3, 3);
  const moveable = createMoveable(0, 0, 0.23, 0.23);
  const autoMoveable = createAutoMoveable(positionable, moveable);
  const spriteRenderable = createSpriteRenderable(name, positionable);

  const trackingMoveable = createTrackingMoveable(
    positionable,
    moveable,
    targetPositionable,
  );

  spriteRenderSystem.register(spriteRenderable);
  trackingSystem.register(trackingMoveable);
  autoMovementSystem.register(autoMoveable);
};

const bindGhosts = (
  spriteRenderSystem: System<SpriteRenderable>,
  trackingSystem: System<TrackingMoveable>,
  autoMovementSystem: System<AutoMoveable>,
  targetPositionable: TilePositionable,
) => {
  ghosts.forEach(def => {
    console.log('********', def);
    bindGhost(
      def,
      spriteRenderSystem,
      trackingSystem,
      autoMovementSystem,
      targetPositionable,
    );
  });
};

export default bindGhosts;
