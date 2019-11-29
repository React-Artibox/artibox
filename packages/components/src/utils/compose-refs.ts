import { Ref } from 'react';

export function composeRefs<T>(refs: Ref<T>[]) {
  return (element: T) => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        return ref(element);
      }

      (ref as any).current = element;
    });
  };
}
