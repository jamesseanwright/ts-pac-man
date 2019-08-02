import { Component } from './component';

export type Next<T extends Component> = (time: number, component: T) => void;

const createSystem = <T extends Component>(components: T[], next: Next<T>) => (
  time: number,
) => {
  for (let component of components) {
    next(time, component);
  }
};

export default createSystem;
