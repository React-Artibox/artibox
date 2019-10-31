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
import {
  Heading1Plugin,
  useHeading1IsActive,
  useHeading1OnClick,
  Heading2Plugin,
  useHeading2IsActive,
  useHeading2OnClick,
  Heading3Plugin,
  useHeading3IsActive,
  useHeading3OnClick
} from '@artibox/slate-plugin-heading';

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
const Heading1Button = createToggleButton(useHeading1IsActive, useHeading1OnClick, 'heading 1');
const Heading2Button = createToggleButton(useHeading2IsActive, useHeading2OnClick, 'heading 2');
const Heading3Button = createToggleButton(useHeading3IsActive, useHeading3OnClick, 'heading 3');

export const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
  Heading1Plugin(),
  Heading2Plugin(),
  Heading3Plugin(),
  {
    renderEditor: (_, editor, next) => {
      return (
        <>
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
          <StrikethroughButton editor={editor} />
          <UnderlineButton editor={editor} />
          <Heading1Button editor={editor} />
          <Heading2Button editor={editor} />
          <Heading3Button editor={editor} />
          {next()}
        </>
      );
    }
  }
];
