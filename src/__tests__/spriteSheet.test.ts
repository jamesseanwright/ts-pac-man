import createSpriteSheet, { SpriteDefinition } from '../spriteSheet';

describe('spriteSheet', () => {
  it('should create in-memory images from a spritesheet image for each provided definition', () => {
    const sheet = new Image();

    const definitions: SpriteDefinition[] = [
      ['pac-man', [20, 50, 32, 32]],
      ['blinky', [52, 82, 28, 28]],
    ];

    const sheetContext = {
      canvas: {
        width: 0,
        height: 0,
      },
      drawImage: jest.fn(),
      getImageData: jest.fn(),
    };

    const spriteContext = {
      canvas: {
        width: 0,
        height: 0,
        toDataURL: jest.fn(),
      },
      putImageData: jest.fn(),
    };

    sheet.width = sheet.height = 500;

    const spriteSheet = createSpriteSheet(sheetContext, spriteContext, sheet, definitions);
  });
});
