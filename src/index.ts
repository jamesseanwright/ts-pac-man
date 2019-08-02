const loop = (time: number) => {
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);