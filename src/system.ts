import { Component } from './component';

export type Next<T extends Component> = (component: T, time: number) => void;

export interface System<T extends Component> {
  register(component: T): void;
  update(time: number): void;
}

const createSystem = <T extends Component>(next: Next<T>): System<T> => {
  const components: T[] = [];

  return {
    register(component: T) {
      components.push(component);
    },

    update(time: number) {
      for (let component of components) {
        next(component, time);
      }
    },
  };
};

export default createSystem;
