import { createKeyboardMovementSystem } from '../keyboardMovementSystem';
import createTilePositionable from '../../tilePositionable';
import createMoveable from '../../moveable';
import createKeyboardMoveable from '../keyboardMoveable';

describe('keyboardMovementSystem', () => {
  const createKeyboard = (expectedKey: string) => ({
    getLastPressedKey: () => expectedKey,
  });

  it('should set the direction to left when left is pressed and can move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowLeft');
    const canMoveTo = () => true;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([-1, 0]);
  });

  it('should invalidate the direction when left is pressed and cannot move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowLeft');
    const canMoveTo = () => false;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([0, 0]);
  });

  it('should set the direction to right when right is pressed and can move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowRight');
    const canMoveTo = () => true;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([1, 0]);
  });

  it('should invalidate the direction right is pressed and cannot move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowRight');
    const canMoveTo = () => false;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([0, 0]);
  });

  it('should set the direction to up when up is pressed and can move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowUp');
    const canMoveTo = () => true;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([0, -1]);
  });

  it('should invalidate the direction when up is pressed and cannot move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowUp');
    const canMoveTo = () => false;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([0, 0]);
  });

  it('should set the direction to down when down is pressed and can move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowDown');
    const canMoveTo = () => true;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([0, 1]);
  });

  it('should invalidate the direction when down is pressed and cannot move', () => {
    const tilePositionable = createTilePositionable(2, 1, 1, 1);
    const moveable = createMoveable(0, 0, 1, 1);
    const keyboardMoveable = createKeyboardMoveable(tilePositionable, moveable);
    const keyboard = createKeyboard('ArrowDown');
    const canMoveTo = () => false;

    const keyboardMovementSystem = createKeyboardMovementSystem(
      keyboard,
      canMoveTo,
    );

    keyboardMovementSystem(keyboardMoveable);

    expect(moveable.direction).toEqual([0, 0]);
  });
});
