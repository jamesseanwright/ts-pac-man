export interface Moveable {
  speed: [number, number];
}

// TODO: => createTileMoveable
const createMoveable = (xSpeed: number, ySpeed: number): Moveable => ({
  speed: [xSpeed, ySpeed],
});

export default createMoveable;
