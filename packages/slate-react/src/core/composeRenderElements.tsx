import React from 'react';
import { composeRenderElementsBase } from '../_internal/renderer/composeRenderElementsBase';
import { RenderElementProps } from './typings/renderer';
import DefaultElement from './components/DefaultElement';

/**
 * To compose sequential `renderElement`s to single.
 */
export function composeRenderElements(
  renderElements: ((props: RenderElementProps) => JSX.Element | null | undefined)[]
) {
  return composeRenderElementsBase(props => <DefaultElement {...props} />, renderElements);
}
