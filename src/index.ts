import createPositionable from './positionable';

createPositionable(0, 0, 9, 9);

const loop = (time: number) => {
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
