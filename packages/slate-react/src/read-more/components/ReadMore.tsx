import React from 'react';
import { useLocale } from '../../configs';
import { RenderElementProps } from '../../core';
import './read-more.styles';

export interface ReadMoreProps {
  attributes?: RenderElementProps['attributes'];
  children: any;
}

function ReadMore(props: ReadMoreProps) {
  const { attributes, children } = props;
  const { readMore } = useLocale().editor;

  return (
    <div {...attributes} className="artibox-slate-read-more" contentEditable={false}>
      <span className="artibox-slate-read-more__description">{readMore}</span>
      {attributes ? children : undefined}
    </div>
  );
}

export default ReadMore;
