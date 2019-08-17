export interface Keyboard {
  getLastPressedKey(): string;
}

const createKeyboard = (
  eventTarget: Window,
  supportedKeys: string[],
): Keyboard => {
  let lastPressedKey = '';

  const updateKey = (key: string, isPressed: boolean) => {
    if (supportedKeys.includes(key) && key !== lastPressedKey) {
      lastPressedKey = key;
    }
  };

  eventTarget.addEventListener('keydown', ({ key }) => updateKey(key, true));
  eventTarget.addEventListener('keyup', ({ key }) => updateKey(key, false));

  return {
    getLastPressedKey() {
      return lastPressedKey;
    },
  };
};

export default createKeyboard;
