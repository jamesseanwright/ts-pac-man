import createKeyboard from '../keyboard';

describe('keyboard', () => {
  describe('getLastPressedKey', () => {
    it('should return an empty string if no key has been pressed', () => {
      const keyboard = createKeyboard(window, ['ArrowUp']);

      expect(keyboard.getLastPressedKey()).toBe('');
    });
  });

  it('should return the last pressed key if included in the supported keys array', () => {
    const keyboard = createKeyboard(window, ['ArrowUp']);

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowUp',
      }),
    );

    expect(keyboard.getLastPressedKey()).toBe('ArrowUp');
  });

  it('should not register unsupported keys', () => {
    const keyboard = createKeyboard(window, ['ArrowLeft']);

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
      }),
    );

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      }),
    );

    expect(keyboard.getLastPressedKey()).toBe('ArrowLeft');
  });
});
