// [sprite name, [x, y, width, height]]
export type SpriteDefinition = [string, [number, number, number, number]];

export const spriteSheetCreator = (createBitmapImage: typeof window.createImageBitmap) => {
  return async (
    sheet: CanvasImageSource,
    definitions: SpriteDefinition[],
  ) => {
    const sprites = await Promise.all(
      definitions.map(
        ([, dimensions]) => createBitmapImage(sheet, ...dimensions),
      ),
    );


    return new Map<string, ImageBitmap>(
      definitions.map(([name], i) => [name, sprites[i]]),
    );
  };
};

export default spriteSheetCreator(window.createImageBitmap);
