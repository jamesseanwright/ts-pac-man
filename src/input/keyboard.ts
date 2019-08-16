export interface Keyboard {
  isKeyPressed(key: string): boolean;
}

const createKeyboard = (eventTarget: Window, supportedKeys: string[]): Keyboard => {
  const keys = new Map<string, boolean>(supportedKeys.map(key => [key, false]));

  const updateKey = (key: string, isPressed: boolean) => {
    if (keys.has(key)) {
      keys.set(key, isPressed);
    }
  };

  eventTarget.addEventListener('keydown', ({ key }) => updateKey(key, true));
  eventTarget.addEventListener('keyup', ({ key }) => updateKey(key, false));

  return {
    isKeyPressed(key: string) {
      return Boolean(keys.get(key));
    },
  };
};

export default createKeyboard;
