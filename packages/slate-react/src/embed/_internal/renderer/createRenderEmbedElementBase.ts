import { deserializeEmbedElementToData, EmbedElement, EmbedStrategies } from '@artibox/slate-common/embed/common';
import { RenderElementPropsBase } from '../../../_internal/renderer/typings';

export function createRenderEmbedElementBase<
  P extends string,
  RP extends RenderElementPropsBase<EmbedElement> & { data: any }
>({
  strategies,
  renderers
}: {
  strategies: EmbedStrategies<P>;
  renderers: {
    [K in P]: (props: RP) => JSX.Element | null | undefined;
  };
}): (props: RP) => JSX.Element | null | undefined {
  return props => {
    const result = deserializeEmbedElementToData(props.element, strategies);

    if (result) {
      const [provider, data] = result;
      const render = renderers[provider];
      return render({ ...props, data });
    }
  };
}
