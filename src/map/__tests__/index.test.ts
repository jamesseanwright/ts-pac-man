import { createMapBinder, Tile, isWalkable } from '../index';
import createSpriteRenderable from '../../rendering/spriteRenderable';
import createPositionable from '../../tilePositionable';
import createRotatable from '../../rotatable';

const createComponent = (spriteName: string, rotation: number, column: number, row: number) =>
  createSpriteRenderable(
    spriteName,
    createPositionable(column, row, 1, 1),
    createRotatable(rotation),
  );

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
