import { CreateRenderElementOptionsBase, RenderElementPropsBase } from './typings';

export function createRenderElementsBase<P extends RenderElementPropsBase, RP extends RenderElementPropsBase>(
  options: CreateRenderElementOptionsBase<P>[]
): (props: RP) => JSX.Element | null | undefined {
  return props => {
    for (const { type, render } of options) {
      if (props.element.type === type) {
        return render((props as any) as P);
      }
    }
  };
}
