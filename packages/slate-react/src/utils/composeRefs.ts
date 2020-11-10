import { Ref } from 'react';

/**
 * Compose all refs to single one.
 * It's helpful if you want to use useRef in an forwardRef component.
 *
 * @example
 *
 * const Some = forwardRef((props, ref) => {
 *   const refFromHook = useRef(null);
 *   const composedRef = composeRefs([ref, refFromHook]);
 *
 *   return (
 *     <div ref{composedRef}>
 *       ...
 *     </div>
 *   );
 * });
 */
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
