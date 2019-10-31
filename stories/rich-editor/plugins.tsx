import React from 'react';
import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { UseToggleMarkIsActive, UseToggleMarkOnClick } from '@artibox/slate-plugin-toggle-mark';
import { BoldPlugin, useBoldIsActive, useBoldOnClick } from '@artibox/slate-plugin-bold';
import { ItalicPlugin, useItalicIsActive, useItalicOnClick } from '@artibox/slate-plugin-italic';
import {
  StrikethroughPlugin,
  useStrikethroughIsActive,
  useStrikethroughOnClick
} from '@artibox/slate-plugin-strikethrough';
import { UnderlinePlugin, useUnderlineIsActive, useUnderlineOnClick } from '@artibox/slate-plugin-underline';

interface EditorPassable {
  editor: Editor;
}

function createToggleButton(useActive: UseToggleMarkIsActive, useOnClick: UseToggleMarkOnClick, text: string) {
  function ToggleButton({ editor }: EditorPassable) {
    const active = useActive(editor);
    const onClick = useOnClick(editor);

    return (
      <button
        style={{
          fontWeight: active ? 700 : 400
        }}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  return ToggleButton;
}

const BoldButton = createToggleButton(useBoldIsActive, useBoldOnClick, 'bold');
const ItalicButton = createToggleButton(useItalicIsActive, useItalicOnClick, 'italic');
const StrikethroughButton = createToggleButton(useStrikethroughIsActive, useStrikethroughOnClick, 'strikethrough');
const UnderlineButton = createToggleButton(useUnderlineIsActive, useUnderlineOnClick, 'underline');

export const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
  {
    renderEditor: (_, editor, next) => {
      return (
        <>
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
          <StrikethroughButton editor={editor} />
          <UnderlineButton editor={editor} />
          {next()}
        </>
      );
    }
  }
];
