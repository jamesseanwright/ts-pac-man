type Points2D = [number, number, number, number];

export interface Camera2D {
  project(...points: Points2D): Points2D;
}
