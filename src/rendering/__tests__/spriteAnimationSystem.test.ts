import { createSpriteAnimationSystem } from '../spriteAnimationSystem';
import createSpriteAnimatable from '../spriteAnimatable';

describe('spriteAnimationSystem', () => {
  it('should advance to the next frame when the frame rate is surpassed', () => {
    const spriteAnimatable = createSpriteAnimatable(16.66, 2, 'sprite');
    const spriteAnimationSystem = createSpriteAnimationSystem();

    expect(spriteAnimatable.frame).toBe(0);

    spriteAnimationSystem(spriteAnimatable, 17);

    expect(spriteAnimatable.frame).toBe(1);
  });

  it('should loop back to zero if the sequence length has been surpassed', () => {
    const spriteAnimatable = createSpriteAnimatable(16.66, 2, 'sprite');
    const spriteAnimationSystem = createSpriteAnimationSystem();

    expect(spriteAnimatable.frame).toBe(0);

    spriteAnimationSystem(spriteAnimatable, 17);
    spriteAnimationSystem(spriteAnimatable, 34);

    expect(spriteAnimatable.frame).toBe(0);
  });
});
