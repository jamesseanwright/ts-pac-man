import { createMapBinder, Tile, createCanMoveToTile } from '../map';
import createSpriteRenderable from '../rendering/spriteRenderable';
import createTilePositionable from '../tilePositionable';
import createRotatable from '../rotatable';

const createComponent = (
  spriteName: string,
  rotation: number,
  column: number,
  row: number,
) =>
  createSpriteRenderable(
    spriteName,
    createTilePositionable(column, row, 1, 1),
    createRotatable(rotation),
  );

describe('map', () => {
  describe('map binder', () => {
    it('should create components for each non-walkable map tile', () => {
      /* TODO: return entity from
       * binder to avoid stubs? */
      const spriteRenderSystem = {
        register: jest.fn(),
      };

      const map: Tile[][] = [
        ['A0', 'C0', 'A1'],
        ['C1', 'O', 'C1'],
        ['A3', 'C0', 'A2'],
      ];

      const expectedCalls = [
        createComponent('A', 0, 0, 0),
        createComponent('C', 0, 1, 0),
        createComponent('A', 1.57, 2, 0),
        createComponent('C', 1.57, 0, 1),
        createComponent('C', 1.57, 2, 1),
        createComponent('A', 4.71, 0, 2),
        createComponent('C', 0, 1, 2),
        createComponent('A', 3.14, 2, 2),
      ];

      const bindMap = createMapBinder(map);

      bindMap(spriteRenderSystem);

      spriteRenderSystem.register.mock.calls.forEach(([component], i) => {
        expect(component).toEqual(expectedCalls[i]);
      });
    });
  });

  describe('canMoveToTile', () => {
    const map: Tile[][] = [
      ['A0', 'C0', 'C0', 'C0', 'A1'],
      ['C1', 'O', 'O', 'O', 'C1'],
      ['C1', 'O', 'O', 'O', 'C1'],
      ['C1', 'O', 'O', 'O', 'C1'],
      ['A3', 'C0', 'C0', 'C0', 'A2'],
    ];

    const canMoveToTile = createCanMoveToTile(map);

    it('should return true if the specified position is walkable', () => {
      const tilePositionable = createTilePositionable(2, 2, 1, 1);
      expect(canMoveToTile(tilePositionable, [1, 1])).toBe(true);
    });

    it('should return false if the specified position is not walkable', () => {
      const tilePositionable = createTilePositionable(1, 2, 1, 1);
      expect(canMoveToTile(tilePositionable, [-1, 0])).toBe(false);
    });

    it('should offset any sizes if the corresponding directions are positive', () => {
      const tilePositionable = createTilePositionable(2, 2, 2, 2);
      expect(canMoveToTile(tilePositionable, [1, 1])).toBe(false);
    });

    it('should incorporate rounded-up offsets', () => {
      const tilePositionable = createTilePositionable(2, 2, 1, 1);

      tilePositionable.offset = [0.5, 0.5];

      expect(canMoveToTile(tilePositionable, [1, 1])).toBe(false);
    });
  });
});
