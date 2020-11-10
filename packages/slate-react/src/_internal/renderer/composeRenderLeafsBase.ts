import { RenderLeafPropsBase } from './typings';

export function composeRenderLeafsBase<P extends RenderLeafPropsBase>(
  renderDefault: (props: P) => JSX.Element,
  renderLeafs: ((props: P) => JSX.Element)[]
): (props: P) => JSX.Element {
  return props => {
    props = { ...props };

    renderLeafs.forEach(renderLeaf => {
      props.children = renderLeaf(props);
    });

    return renderDefault(props);
  };
}
