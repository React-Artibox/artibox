import React from 'react';
import { RenderElementProps } from '@artibox/slate-react';

interface Props extends Pick<RenderElementProps, 'children'> {
  attributes?: RenderElementProps['attributes'];
}

export const customRenderBlockquote = ({ attributes, children }: Props) => (
  <div {...attributes} className="stories__custom-elements__blockquote">
    <div className="stories__custom-elements__blockquote__line" contentEditable={false} />
    {children}
  </div>
);
