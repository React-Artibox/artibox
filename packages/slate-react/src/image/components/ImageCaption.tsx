import React from 'react';
import { Editor } from 'slate';
import { ReactEditor, useEditor } from 'slate-react';
import clsx from 'clsx';
import { useLocale } from '../../configs';
import { RenderImageCaptionElementProps } from '../typings';
import './image.styles';

function ImageCaption(props: RenderImageCaptionElementProps) {
  const { attributes, children, element } = props;
  const editor = useEditor();
  const path = ReactEditor.findPath(editor, element);
  const text = Editor.string(editor, path);
  const isEmpty = !text;
  const locale = useLocale();
  const placeholder = locale.editor.image.captionInputPlaceholder;

  return (
    <figcaption
      {...attributes}
      className={clsx('artibox-slate-image__caption', {
        'artibox-slate-image__caption--empty': isEmpty
      })}
    >
      {isEmpty && (
        <span className="artibox-slate-image__caption-placeholder" contentEditable={false}>
          {placeholder}
        </span>
      )}
      {children}
    </figcaption>
  );
}

export default ImageCaption;
