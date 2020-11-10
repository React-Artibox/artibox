import { KeyboardEvent, useLayoutEffect, useRef } from 'react';
import { useSlate } from 'slate-react';
import { useLocale } from '../../configs';
import { RenderInputBlockElementProps } from '../typings';

export function useInputBlock({ confirm, element, remove }: RenderInputBlockElementProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const editor = useSlate();
  const locale = useLocale();
  const placeholder = element.getPlaceholder(locale);
  /**
   * Since keying `Enter` or `Escape` will also cause input blurred
   * Add a `removeable` flag to avoid.
   */
  const removeable = useRef(true);
  const removeIfRemovable = () => {
    if (removeable.current) {
      removeable.current = false;
      remove(editor, element);
    }
  };

  useLayoutEffect(() => {
    /**
     * To avoid from selection of slate broken, delay autoFocus.
     */
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [inputRef]);

  return {
    inputRef,
    onBlur: removeIfRemovable,
    onKeyDown: (event: KeyboardEvent) => {
      const value = inputRef.current?.value;

      if (event.key === 'Enter') {
        event.preventDefault();

        if (value) {
          removeable.current = false;
          confirm(editor, element, value);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        removeIfRemovable();
      }
    },
    placeholder
  };
}
