import React from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useEditor } from 'slate-react';
import { RenderImageElementProps } from '../typings';
import { useImageResizer } from '../hooks/useImageResizer';
import './image.styles';

function Image(props: RenderImageElementProps) {
  const { attributes, children, element, resizeImage, src } = props;
  const editor = useEditor();
  const { focusedAndSelected, imageRef, onResizeStart } = useImageResizer(element, resizeImage);

  return (
    <div
      {...attributes}
      className="artibox-slate-image"
      onClick={() => Transforms.select(editor, ReactEditor.findPath(editor, element))}
      onMouseDown={event => event.preventDefault()}
    >
      <div className="artibox-slate-image__spacer">{children}</div>
      <div contentEditable={false}>
        {focusedAndSelected && (
          <>
            <span className="artibox-slate-image__boundary" />
            <span className="artibox-slate-image__resizer" onMouseDown={onResizeStart} onTouchStart={onResizeStart} />
          </>
        )}
        <img ref={imageRef} src={src} />
      </div>
    </div>
  );
}

export default Image;
