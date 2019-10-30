import { QueryFunc } from 'slate';

export type QueryIterable<Q> = [Q, QueryFunc];

export class Queries<Q> {
  private readonly _map: Map<Q, QueryFunc>;

  constructor(iterables: QueryIterable<Q>[]) {
    this._map = new Map(iterables);
  }

  get<QQ>(key: QQ): QQ extends Q ? QueryFunc : undefined {
    return this._map.get(key as any) as any;
  }

  *[Symbol.iterator]() {
    for (const iterable of this._map) {
      yield iterable;
    }
  }
}
