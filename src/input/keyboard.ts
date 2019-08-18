export interface Keyboard {
  getLastPressedKey(): string;
}

const createKeyboard = (
  eventTarget: Window,
  supportedKeys: string[],
): Keyboard => {
  let lastPressedKey = '';

  const updateKey = (key: string) => {
    if (supportedKeys.includes(key) && key !== lastPressedKey) {
      lastPressedKey = key;
    }
  };

  eventTarget.addEventListener('keydown', ({ key }) => updateKey(key));

  return {
    getLastPressedKey() {
      return lastPressedKey;
    },
  };
};

export default createKeyboard;
