export const addVectors = (...vectors: number[][]) =>
  vectors.reduce((acc, vector) => acc.map((n, i) => n + vector[i]));

export const ceilingVector = (vector: number[]) =>
  vector.map(n => Math.ceil(n));
