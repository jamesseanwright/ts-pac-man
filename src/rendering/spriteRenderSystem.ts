import createSystem from '../system';
import { Camera2D } from './camera';
import { SpriteRenderable } from './spriteRenderable';

const createSpriteRenderSystem = (
  context: CanvasRenderingContext2D,
  spriteSheet: Map<string, ImageBitmap>,
  camera: Camera2D,
  components: SpriteRenderable[]
) =>
  createSystem<SpriteRenderable>(components, (time, component) => {
    const sprite = spriteSheet.get(component.spriteName);

    if (!sprite) {
      throw new Error(`Sprite ${component.spriteName} not found!`);
    }

    const [x, y] = component.positionable.pos;
    const { width, height } = component.positionable;

    context.drawImage(sprite, ...camera.project(x, y, width, height));
  });

export default createSpriteRenderSystem;
