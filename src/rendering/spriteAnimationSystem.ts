import { SpriteAnimatable } from './spriteAnimatable';
import createSystem from '../system';

export const createSpriteAnimationSystem = () => {
  let lastFrameTimeMs = 0;

  return (spriteAnimatable: SpriteAnimatable, time: number) => {
    if (time - lastFrameTimeMs > spriteAnimatable.frameRateMs) {
      spriteAnimatable.frame =
        spriteAnimatable.frame === spriteAnimatable.sequenceLength - 1
          ? 0
          : spriteAnimatable.frame + 1;
      spriteAnimatable.spriteRenderable.spriteName = `${spriteAnimatable.spritePrefix}-${spriteAnimatable.frame}`;
      lastFrameTimeMs = time;
    }
  };
};

export default createSystem<SpriteAnimatable>(createSpriteAnimationSystem());
