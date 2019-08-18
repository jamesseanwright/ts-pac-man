import { createSpriteAnimationSystem } from '../spriteAnimationSystem';
import createSpriteAnimatable from '../spriteAnimatable';
import createSpriteRenderable from '../spriteRenderable';
import createTilePositionable from '../../tilePositionable';

describe('spriteAnimationSystem', () => {
  it('should advance to the next frame when the frame rate is surpassed', () => {
    const tilePositionable = createTilePositionable(0, 0, 1, 1);
    const spriteRenderable = createSpriteRenderable(
      'sprite-0',
      tilePositionable,
    );
    const spriteAnimatable = createSpriteAnimatable(
      spriteRenderable,
      16.66,
      2,
      'sprite',
    );
    const spriteAnimationSystem = createSpriteAnimationSystem();

    expect(spriteAnimatable.frame).toBe(0);

    spriteAnimationSystem(spriteAnimatable, 17);

    expect(spriteAnimatable.frame).toBe(1);
    expect(spriteRenderable.spriteName).toBe('sprite-1');
  });

  it('should loop back to zero if the sequence length has been surpassed', () => {
    const tilePositionable = createTilePositionable(0, 0, 1, 1);
    const spriteRenderable = createSpriteRenderable(
      'sprite-0',
      tilePositionable,
    );
    const spriteAnimatable = createSpriteAnimatable(
      spriteRenderable,
      16.66,
      2,
      'sprite',
    );
    const spriteAnimationSystem = createSpriteAnimationSystem();

    expect(spriteAnimatable.frame).toBe(0);

    spriteAnimationSystem(spriteAnimatable, 17);
    spriteAnimationSystem(spriteAnimatable, 34);

    expect(spriteAnimatable.frame).toBe(0);
    expect(spriteRenderable.spriteName).toBe('sprite-0');
  });
});
