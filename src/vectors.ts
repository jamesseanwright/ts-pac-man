/* Note: these functions assume uniform size of
 * all vectors. This is all our game needs */

export const addVectors = <TVector extends number[]>(...vectors: TVector[]) =>
  vectors.reduce((acc, vector) => acc.map((n, i) => n + vector[i]) as TVector);

export const multiplyVectors = <TVector extends number[]>(
  ...vectors: TVector[]
) =>
  vectors.reduce((acc, vector) => acc.map((n, i) => n * vector[i]) as TVector);

export const ceilingVector = <TVector extends number[]>(vector: TVector) =>
  vector.map(n => Math.ceil(n));

export const isNegationOfVector = <TVector extends number[]>(negation: TVector, vector: TVector) =>
  vector.every((n, i) => n * -1 === negation[i]);
