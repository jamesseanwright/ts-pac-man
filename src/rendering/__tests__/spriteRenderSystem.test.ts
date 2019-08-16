import { createSpriteRenderSystem, Context } from '../spriteRenderSystem';
import createTilePositionable from '../../tilePositionable';
import createSpriteRenderable from '../spriteRenderable';
import createRotatable from '../../rotatable';

const createContext = (): Context => ({
  translate: jest.fn(),
  rotate: jest.fn(),
  resetTransform: jest.fn(),
  drawImage: jest.fn(),
});

describe('spriteRenderSystem', () => {
  const project = (...args: [number, number, number, number]) => args;
  const positionable = createTilePositionable(10, 15, 32, 32);

  const spriteSheet = new Map<string, ImageBitmap>([
    ['some-sprite', ('pretend-bitmap-image' as unknown) as ImageBitmap],
  ]);

  it('should render the given sprite as an image onto the provided context', () => {
    const context = createContext();
    const system = createSpriteRenderSystem(context, spriteSheet, project);

    const spriteRenderable = createSpriteRenderable(
      'some-sprite',
      positionable,
    );

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
    const context = createContext();
    const system = createSpriteRenderSystem(context, spriteSheet, project);
    const spriteRenderable = createSpriteRenderable(
      'invalid-sprite',
      positionable,
    );

    expect(() => system(spriteRenderable)).toThrowError(
      'Sprite invalid-sprite not found!',
    );
  });

  it('should rotate the sprite if the component holds a rotatable reference', () => {
    const context = createContext();
    const system = createSpriteRenderSystem(context, spriteSheet, project);
    const rotatable = createRotatable(1.57);

    const spriteRenderable = createSpriteRenderable(
      'some-sprite',
      positionable,
      rotatable,
    );

    system(spriteRenderable);

    expect(context.rotate).toHaveBeenCalledTimes(1);
    expect(context.translate).toHaveBeenCalledTimes(1);
    expect(context.drawImage).toHaveBeenCalledTimes(1);

    expect(context.rotate).toHaveBeenCalledWith(1.57);
    expect(context.translate).toHaveBeenCalledWith(26, 31);

    expect(context.drawImage).toHaveBeenCalledWith(
      'pretend-bitmap-image',
      10,
      15,
      32,
      32,
    );

    expect(context.resetTransform).toHaveBeenCalledTimes(1);
  });
});
