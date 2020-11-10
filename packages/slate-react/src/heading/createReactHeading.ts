import isHotkey from 'is-hotkey';
import { createHeading, CreateHeadingOptions, HeadingLevel } from '@artibox/slate-common/heading';
import { createRenderElement } from '../core';
import { createOnKeyDownBreak } from '../break';
import { ReactHeading } from './typings';
import { HEADING_HOTKEY } from './constants';
import { defaultRenderHeadingElement } from './defaultRenderHeadingElement';

export type CreateReactHeadingOptions<L extends HeadingLevel> = CreateHeadingOptions<L>;

export function createReactHeading<L extends HeadingLevel = HeadingLevel>(
  options: CreateReactHeadingOptions<L> = {}
): ReactHeading<L> {
  const core = createHeading(options);
  const { type } = core;

  return {
    ...core,
    createHandlers: ({ hotkey = HEADING_HOTKEY } = {}) => {
      const onKeyDownBreak = createOnKeyDownBreak({
        exitBreak: {
          rules: [
            {
              hotkey: 'enter',
              match: {
                onlyAtEdge: true,
                includeTypes: [type]
              }
            }
          ]
        }
      });

      return {
        onKeyDown(event, editor, next) {
          /**
           * Only toggle if the hotkey is fired and the key is the same as level.
           */
          const keyAsNumber = +event.key;

          if (!isNaN(keyAsNumber) && isHotkey(hotkey, event as any)) {
            try {
              core.toggleHeadingNodes(editor, keyAsNumber as L);
              event.preventDefault();
              return;
              // eslint-disable-next-line no-empty
            } catch {}
          } else {
            onKeyDownBreak(event, editor, next);
          }
        }
      };
    },
    createRenderElement: ({ render = defaultRenderHeadingElement } = {}) => createRenderElement({ type, render })
  };
}
