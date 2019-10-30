import { CommandFunc } from 'slate';

export type CommandIterable<C> = [C, CommandFunc];

export class Commands<C> {
  private readonly _map: Map<C, CommandFunc>;

  constructor(iterables: CommandIterable<C>[]) {
    this._map = new Map(iterables);
  }

  get<CC>(key: CC): CC extends C ? CommandFunc : undefined {
    return this._map.get(key as any) as any;
  }

  *[Symbol.iterator]() {
    for (const iterable of this._map.entries()) {
      yield iterable;
    }
  }
}
