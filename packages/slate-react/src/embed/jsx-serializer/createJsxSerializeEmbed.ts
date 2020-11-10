import { EmbedStrategies, EMBED_TYPE } from '@artibox/slate-common/embed/common';
import { createJsxSerializeElement } from '../../jsx-serializer';
import { JsxSerializeEmbedElement, JsxSerializeEmbedElementProps } from './typings';
import { createRenderEmbedElementBase } from '../_internal/renderer/createRenderEmbedElementBase';

export interface CreateJsxSerializeEmbedOptions<P extends string> {
  type?: string;
  strategies: EmbedStrategies<P>;
  renderers: {
    [K in P]: JsxSerializeEmbedElement<any, any>;
  };
}

export function createJsxSerializeEmbed<P extends string>(options: CreateJsxSerializeEmbedOptions<P>) {
  const { type = EMBED_TYPE, strategies, renderers } = options;

  return createJsxSerializeElement<JsxSerializeEmbedElementProps<any, any>>({
    type,
    render: createRenderEmbedElementBase({ strategies, renderers })
  });
}
