import { RenderElementPropsBase } from './typings';

export function composeRenderElementsBase<P extends RenderElementPropsBase>(
  renderDefault: (props: P) => JSX.Element,
  renderElements: ((props: P) => JSX.Element | null | undefined)[]
): (props: P) => JSX.Element {
  return props => {
    for (const renderElement of renderElements) {
      const element = renderElement(props);

      if (element) {
        return element;
      }
    }

    return renderDefault(props);
  };
}
