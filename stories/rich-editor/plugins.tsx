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
import { HeadingPlugin, useHeadingIsActive, useHeadingOnClick } from '@artibox/slate-plugin-heading';
import { SeparationLinePlugin, useSeparationLineOnClick } from '@artibox/slate-plugin-separation-line';
import { BlockquotePlugin, useBlockquoteIsActive, useBlockquoteOnClick } from '@artibox/slate-plugin-blockquote';

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
const Heading1Button = createToggleButton(
  editor => useHeadingIsActive(editor, 1),
  editor => useHeadingOnClick(editor, 1),
  'heading 1'
);
const Heading2Button = createToggleButton(
  editor => useHeadingIsActive(editor, 2),
  editor => useHeadingOnClick(editor, 2),
  'heading 2'
);
const Heading3Button = createToggleButton(
  editor => useHeadingIsActive(editor, 3),
  editor => useHeadingOnClick(editor, 3),
  'heading 3'
);
const SeparationLineButton = ({ editor }: EditorPassable) => {
  const onClick = useSeparationLineOnClick(editor);
  return <button onClick={onClick}>separation line</button>;
};
const BlockquoteButton = createToggleButton(useBlockquoteIsActive, useBlockquoteOnClick, 'blockquote');

export const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
  HeadingPlugin({
    disabled: [4, 5, 6]
  }),
  SeparationLinePlugin(),
  BlockquotePlugin(),
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
          <SeparationLineButton editor={editor} />
          <BlockquoteButton editor={editor} />
          {next()}
        </>
      );
    }
  }
];
