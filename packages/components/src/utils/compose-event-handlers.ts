import { SyntheticEvent, EventHandler } from 'react';

export function composeEventHandlers<E extends SyntheticEvent<any, Event>>(handlers: (EventHandler<E> | undefined)[]) {
  const existHandlers = handlers.filter(Boolean) as EventHandler<E>[];

  if (existHandlers.length === 0) {
    return undefined;
  }

  const [firstHandler, ...restHandlers] = existHandlers;

  if (restHandlers.length === 0) {
    return firstHandler;
  }

  return restHandlers.reduce(
    (composedHandler, handler) => event => {
      composedHandler(event);
      handler(event);
    },
    firstHandler
  );
}
