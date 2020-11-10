import { DOMAttributes } from 'react';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type EventHandlers = Omit<DOMAttributes<HTMLElement>, 'children' | 'dangerouslySetInnerHTML'>;

export type EventHandlerName = keyof EventHandlers;

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
