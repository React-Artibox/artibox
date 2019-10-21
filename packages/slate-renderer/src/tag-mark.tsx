import React, { ReactHTML } from 'react';
import { RenderMarkProps, Plugin } from 'slate-react';

export interface RenderTagMarkConfig {
  markType: string | symbol;
  component: keyof ReactHTML;
  renderIf: (config: RenderTagMarkConfig, props: RenderMarkProps) => boolean;
}

export function RenderTagMark(config: RenderTagMarkConfig) {
  const { component: Component, renderIf } = config;

  const TagMark: Plugin['renderMark'] = (props, _, next) => {
    const { children, attributes } = props;

    if (!renderIf(config, props)) {
      return next();
    }

    return <Component {...attributes}>{children}</Component>;
  };

  return TagMark;
}
