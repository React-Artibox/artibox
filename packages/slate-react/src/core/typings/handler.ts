import { DOMAttributes, EventHandler } from 'react';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type EventHandlerName = {
  [K in keyof Required<DOMAttributes<HTMLElement>>]: NonNullable<DOMAttributes<HTMLElement>[K]> extends EventHandler<
    any
  >
    ? K
    : never;
}[keyof DOMAttributes<HTMLElement>];

export type EventHandlers = Pick<DOMAttributes<HTMLElement>, EventHandlerName>;

export type GetEventHandlerByName<H extends EventHandlerName> = NonNullable<EventHandlers[H]>;

export type GetEventByName<H extends EventHandlerName> = GetEventHandlerByName<H> extends (event: infer E) => void
  ? E
  : never;

export type Handler<H extends EventHandlerName> = (
  event: GetEventByName<H>,
  editor: ReactEditor & HistoryEditor,
  next: VoidFunction
) => void;

export type Handlers = {
  [H in EventHandlerName]?: Handler<H>;
};

export interface WithCreateHandlers<P extends any[] = []> {
  createHandlers: (...params: P) => Handlers;
}
