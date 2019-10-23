import { CommonPlugin } from '@artibox/slate-types';

export function mergePlugins<P = CommonPlugin>(plugins: CommonPlugin[]): P {
  return plugins.reduce((acc, prev) => Object.assign(acc, prev), {}) as P;
}
