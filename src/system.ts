import { Component } from './component';

export type Next<T extends Component> = (component: T, time: number) => void;

const createSystem = <T extends Component>(components: T[], next: Next<T>) => (
  time: number,
) => {
  for (let component of components) {
    next(component, time);
  }
};

export default createSystem;
