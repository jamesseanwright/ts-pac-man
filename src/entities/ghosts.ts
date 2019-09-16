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

// [name, column, row, x dir, y dir]
type GhostDefinition = [string, number, number, number, number];

const ghosts: GhostDefinition[] = [
  ['blinky', 45, 1, -1, 0],
  ['pinky', 5, 1, -1, 0],
  ['inky', 5, 46, 1, 0],
  ['clyde', 47, 46, -1, 0],
];

const bindGhost = (
  [name, column, row, xDir, yDir]: GhostDefinition,
  spriteRenderSystem: System<SpriteRenderable>,
  trackingSystem: System<TrackingMoveable>,
  autoMovementSystem: System<AutoMoveable>,
  targetPositionable: TilePositionable,
) => {
  const positionable = createTilePositionable(column, row, 3, 3);
  const moveable = createMoveable(xDir, yDir, 0.23, 0.23);
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
