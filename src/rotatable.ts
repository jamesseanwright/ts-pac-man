export interface Rotatable {
  angle: number;
}

const createRotatable = (
  angle = 0,
): Rotatable => ({ angle });

export default createRotatable;
