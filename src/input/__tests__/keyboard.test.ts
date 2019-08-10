import createKeyboard from '../keyboard';

describe('keyboard', () => {
  it('should not mark key as pressed if it is supported but not pressed', () => {
    const keyboard = createKeyboard(window, ['ArrowUp']);

    expect(keyboard.isKeyPressed('ArrowUp')).toBe(false);
  });

  it('should mark a key as pressed if it is supported and pressed', () => {
    const keyboard = createKeyboard(window, ['ArrowUp']);

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowUp',
      }),
    );

    expect(keyboard.isKeyPressed('ArrowUp')).toBe(true);
  });

  it('should not mark a key as pressed if it is not supported', () => {
    const keyboard = createKeyboard(window, ['ArrowUp']);

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      }),
    );

    expect(keyboard.isKeyPressed('ArrowDown')).toBe(false);
  });

  it('should not mark a key as pressed if it is pressed then released', () => {
    const keyboard = createKeyboard(window, ['ArrowUp']);

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowUp',
      }),
    );

    expect(keyboard.isKeyPressed('ArrowUp')).toBe(true);

    window.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'ArrowUp',
      }),
    );

    expect(keyboard.isKeyPressed('ArrowUp')).toBe(false);
  });
});
