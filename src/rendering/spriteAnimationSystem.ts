import { SpriteAnimatable } from './spriteAnimatable';

export const createSpriteAnimationSystem = () => {
  let lastFrameTimeMs = 0;

  return (spriteAnimatable: SpriteAnimatable, time: number) => {
    if (time - lastFrameTimeMs > spriteAnimatable.frameRateMs) {
      spriteAnimatable.frame = spriteAnimatable.frame === spriteAnimatable.sequenceLength - 1 ? 0 : spriteAnimatable.frame + 1;
      lastFrameTimeMs = time;
    }
  };
};
