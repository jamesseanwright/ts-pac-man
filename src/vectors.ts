export const addVectors = <TVector extends number[]>(...vectors: TVector[]) =>
  vectors.reduce((acc, vector) => acc.map((n, i) => n + vector[i]) as TVector);

export const multiplyVectors = <TVector extends number[]>(...vectors: TVector[]) =>
  vectors.reduce((acc, vector) => acc.map((n, i) => n * vector[i]) as TVector);

export const ceilingVector = (vector: number[]) =>
  vector.map(n => Math.ceil(n));
