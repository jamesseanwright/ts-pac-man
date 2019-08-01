// Used to render the entire sprite sheet
type SheetContext = Pick<CanvasRenderingContext2D, 'drawImage' | 'getImageData'> & {
  canvas: Pick<HTMLCanvasElement, 'width' | 'height'>
};

// Used to render individual sprites from the main sheet
type SpriteContext = Pick<CanvasRenderingContext2D, 'putImageData'> & {
  canvas: Pick<HTMLCanvasElement, 'width' | 'height' | 'toDataURL'>
};

// [sprite name, [x, y, width, height]]
export type SpriteDefinition = [string, [number, number, number, number]];

const createSpriteSheet = (sheetContext: SheetContext, spriteContext: SpriteContext, sheet: HTMLImageElement, definitions: SpriteDefinition[] ) => undefined;

export default createSpriteSheet;