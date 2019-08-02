import { spriteSheetCreator, SpriteDefinition } from '../spriteSheet';

const computeStubImageName = (...dimensions: number[]) =>
  `Stub ImageBitmap for [${dimensions.join(', ')}]`;

describe('spriteSheet', () => {
  it('should create in-memory images from a spritesheet image for each provided definition', async () => {
    const sheet = new Image();

    const definitions: SpriteDefinition[] = [
      ['pac-man', [20, 50, 32, 32]],
      ['blinky', [52, 82, 28, 28]],
    ];

    const createSpriteSheet = spriteSheetCreator((img: ImageBitmapSource, ...dimensions: number[]) =>
      Promise.resolve(computeStubImageName(...dimensions) as unknown as ImageBitmap)
    );

    const spriteSheet = await createSpriteSheet(sheet, definitions);

    definitions.forEach(([name, dimensions]) => {
      expect(spriteSheet.get(name)).toEqual(computeStubImageName(...dimensions));
    });
  });
});
