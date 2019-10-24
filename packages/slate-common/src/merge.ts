import { Plugin } from '@artibox/slate-types';

export function mergePlugins<P = Plugin>(plugins: P[]): P {
  return plugins.reduce((acc, prev) => Object.assign(acc, prev), {}) as P;
}
