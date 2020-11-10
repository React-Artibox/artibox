import { KeyboardEvent } from 'react';
import isHotkey from 'is-hotkey';
import { Editor, Path, Transforms } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph';
import { getAboveBlock } from '@artibox/slate-common/queries/getAboveBlock';
import { isNodeMatch } from '@artibox/slate-common/queries/isNodeMatch';
import { isSelectionAtBlockEdge } from '@artibox/slate-common/queries/isSelectionAtBlockEdge';
import { insertSoftBreak } from '@artibox/slate-common/transforms/insertSoftBreak';
import { Handler } from '../core';
import { ExitBreakRule, SoftBreakRule } from './typings';

export interface CreateOnKeyDownBreakOptions {
  exitBreak?: {
    rules: ExitBreakRule[];
  };
  softBreak?: {
    rules: SoftBreakRule[];
  };
}

export function createOnKeyDownBreak({ exitBreak, softBreak }: CreateOnKeyDownBreakOptions): Handler<'onKeyDown'> {
  return (event: KeyboardEvent, editor: Editor, next) => {
    const { selection } = editor;

    if (selection) {
      /**
       * Take vscode as reference. Won't delete fragment and only use `selection.focus` as the anchor of exit break.
       */
      const entry = getAboveBlock(editor, { at: selection.focus });

      if (exitBreak) {
        const { rules } = exitBreak;

        for (const rule of rules) {
          const {
            hotkey,
            match: { onlyAtEdge = false, ...match } = {},
            before = false,
            defaultType = PARAGRAPH_TYPE
          } = rule;

          if (
            isHotkey(hotkey, event as any) &&
            isNodeMatch(entry, match) &&
            (!onlyAtEdge || isSelectionAtBlockEdge(editor))
          ) {
            let [, at] = entry;

            if (!before) {
              at = Path.next(at);
            }

            event.preventDefault();
            Transforms.insertNodes(
              editor,
              { type: defaultType, children: [{ text: '' }] },
              {
                at,
                select: true
              }
            );
            return;
          }
        }
      }

      if (softBreak) {
        const { rules } = softBreak;

        for (const { hotkey, match } of rules) {
          if (isHotkey(hotkey, event as any) && (!match || isNodeMatch(entry, match))) {
            event.preventDefault();
            insertSoftBreak(editor);
            return;
          }
        }
      }
    }

    next();
  };
}
