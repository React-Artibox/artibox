import { Plugin } from '../types';

export function mergePlugins<P = Plugin>(plugins: Plugin[]): P {
  return plugins.reduce((acc, prev) => Object.assign(acc, prev), {}) as P;
}
