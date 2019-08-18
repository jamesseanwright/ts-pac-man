export interface Moveable {
  direction: [number, number];
  speed: [number, number];
}

// TODO: => createTileMoveable
const createMoveable = (
  xDir: number,
  yDir: number,
  xSpeed: number,
  ySpeed: number,
): Moveable => ({
  direction: [xDir, yDir],
  speed: [xSpeed, ySpeed],
});

export default createMoveable;
