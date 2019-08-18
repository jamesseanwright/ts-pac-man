export interface SpriteAnimatable {
  frame: number;
  frameRateMs: number;
  sequenceLength: number;
  spritePrefix: string;
}

const createSpriteAnimatable = (frameRateMs: number, sequenceLength: number, spritePrefix: string): SpriteAnimatable => ({
  frame: 0,
  frameRateMs,
  sequenceLength,
  spritePrefix,
});

export default createSpriteAnimatable;
