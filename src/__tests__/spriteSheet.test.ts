import { spriteSheetCreator, SpriteDefinition } from '../spriteSheet';
import { promisify } from 'util';
import { readFile as cbReadFile } from 'fs';
import { resolve as resolvePath } from 'path';

const readFile = promisify(cbReadFile);

const getSpriteSheet = async () => {
  const imageData = await readFile(
    resolvePath(__dirname, '..', 'images', 'spritesheet.png'),
  );

  const image = new Image();

  image.src = `data:image/png;base64,${imageData.toString('base64')}`;

    /* load event isn't fired by jsdom's
     * Image implementation so we can
     * just resolve after setting src */
  return image;
};

describe('spriteSheet', () => {
  it('should create in-memory images from a spritesheet image for each provided definition', async () => {
    const sheet = await getSpriteSheet();

    const definitions: SpriteDefinition[] = [
      ['pac-man', [20, 50, 32, 32]],
      ['blinky', [52, 82, 28, 28]],
    ];

    const createSpriteSheet = spriteSheetCreator((img: HTMLImageElement) => Promise.resolve(src));
    const spriteSheet = await createSpriteSheet(sheet, definitions);

    console.log('******', spriteSheet);

    spriteSheet.forEach((sprite, key) => {

    });
  });
});
