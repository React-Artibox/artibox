import { CreateRenderMarkOptionsBase, RenderLeafPropsBase, RenderMarkPropsBase } from './typings';

export function createRenderMarkBase<M, P extends RenderMarkPropsBase<M>>(
  options: CreateRenderMarkOptionsBase<M, P>
): (props: Omit<P, Exclude<keyof RenderMarkPropsBase<M>, keyof RenderLeafPropsBase>>) => JSX.Element {
  const { type, render } = options;
  return props => {
    const { children, leaf } = props;
    const mark = leaf[type] as M | undefined;

    if (mark != null && leaf.text) {
      return render({ ...props, mark } as P);
    }

    return children;
  };
}
