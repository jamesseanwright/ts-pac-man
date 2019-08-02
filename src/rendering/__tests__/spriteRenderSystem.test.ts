import { createSpriteRenderSystem } from '../spriteRenderSystem';
import createPositionable from '../../positionable';
import createSpriteRenderable from '../spriteRenderable';

describe('spriteRenderSystem', () => {
  const canvas = {
    width: 640,
    height: 480,
  };

  const project = (...args: number[]) => args.slice(2, 6) as [number, number, number, number];
  const positionable = createPositionable(10, 15, 32, 32);

  const spriteSheet = new Map<string, ImageBitmap>([
    ['some-sprite', 'pretend-bitmap-image' as unknown as ImageBitmap],
  ]);

  it('should render the given sprite as an image onto the provided context', () => {
    const context = {
      drawImage: jest.fn(),
      canvas,
    };

    const system = createSpriteRenderSystem(context, spriteSheet, project);
    const spriteRenderable = createSpriteRenderable('some-sprite', positionable);

    system(spriteRenderable);

    expect(context.drawImage).toHaveBeenCalledTimes(1);

    expect(context.drawImage).toHaveBeenCalledWith(
      'pretend-bitmap-image',
      10,
      15,
      32,
      32,
    );
  });

  it('should throw an error if the sprite cannot be found in the provided sheet', () => {
    const context = {
      drawImage: jest.fn(),
      canvas,
    };

    const system = createSpriteRenderSystem(context, spriteSheet, project);
    const spriteRenderable = createSpriteRenderable('invalid-sprite', positionable);

    expect(() => system(spriteRenderable)).toThrowError('Sprite invalid-sprite not found!');
  });
});
