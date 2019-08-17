import { createPlayerMovementSystem } from '../playerMovementSystem';
import createTilePositionable from '../../tilePositionable';

describe('playerMovementSystem', () => {
  const createKeyboard = (expectedKey: string) => ({
    isKeyPressed: (key: string) => key === expectedKey,
  });

  it('should move the player to the column left of its current position when the left arrow is pressed and can move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const keyboard = createKeyboard('ArrowLeft');
    const canMoveTo = () => true;
    const playerMovementSystem = createPlayerMovementSystem(keyboard, canMoveTo);

    playerMovementSystem(tilePositionable);

    expect(tilePositionable.pos).toEqual([1, 1]);
  });

  it('should not move the player to the column left of its current position when the left arrow is pressed and cannot move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const keyboard = createKeyboard('ArrowLeft');
    const canMoveTo = () => false;
    const playerMovementSystem = createPlayerMovementSystem(keyboard, canMoveTo);

    playerMovementSystem(tilePositionable);

    expect(tilePositionable.pos).toEqual([2, 1]);
  });

  it('should move the player to the column right of its current position when the right arrow is pressed and can move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const keyboard = createKeyboard('ArrowRight');
    const canMoveTo = () => true;
    const playerMovementSystem = createPlayerMovementSystem(keyboard, canMoveTo);

    playerMovementSystem(tilePositionable);

    expect(tilePositionable.pos).toEqual([3, 1]);
  });

  it('should not move the player to the column right of its current position when the right arrow is pressed and cannot move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const keyboard = createKeyboard('ArrowRight');
    const canMoveTo = () => false;
    const playerMovementSystem = createPlayerMovementSystem(keyboard, canMoveTo);

    playerMovementSystem(tilePositionable);

    expect(tilePositionable.pos).toEqual([2, 1]);
  });
});
