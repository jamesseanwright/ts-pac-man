import { SpriteRenderable } from "./spriteRenderable";

export interface SpriteAnimatable {
  spriteRenderable: SpriteRenderable;
  frame: number;
  frameRateMs: number;
  sequenceLength: number;
  spritePrefix: string;
}

const createSpriteAnimatable = (spriteRenderable: SpriteRenderable, frameRateMs: number, sequenceLength: number, spritePrefix: string): SpriteAnimatable => ({
  spriteRenderable,
  frame: 0,
  frameRateMs,
  sequenceLength,
  spritePrefix,
});

export default createSpriteAnimatable;
