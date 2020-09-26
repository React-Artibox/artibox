import React from 'react';
import { Plugin } from 'slate-react';
import { getImagePropsFromBlock } from './utils/get-image-props-from-block';
import { WithHostingResolvers, ImageComponents, WithThresholds, ImageTypes } from './typings';
import { ImageController } from './controller';

export interface CreateImageRendererConfig extends Partial<WithHostingResolvers & WithThresholds> {
  components: ImageComponents;
  controller: ImageController;
  types: ImageTypes;
}

export function createImageRenderer(config: CreateImageRendererConfig): Plugin {
  const { types, components, controller, hostingResolvers, thresholds } = config;
  const { figure: FigureComponent, image: ImageComponent, caption: CaptionComponent } = components;

  return {
    renderBlock(props, editor, next) {
      const { children, attributes, node, isFocused, isSelected } = props;
      const isFocusedAndSelected = isFocused && isSelected;

      if (node.type === types.figure) {
        return (
          <FigureComponent {...attributes} isBlurred={!isFocusedAndSelected}>
            {children}
          </FigureComponent>
        );
      } else if (node.type === types.image) {
        return (
          <ImageComponent
            {...attributes}
            {...getImagePropsFromBlock(node, hostingResolvers)}
            controller={controller}
            editor={editor}
            node={node}
            isSelected={isFocusedAndSelected}
            thresholds={thresholds}
          />
        );
      } else if (node.type === types.caption) {
        return (
          <CaptionComponent {...attributes} isEmpty={!node.text}>
            {children}
          </CaptionComponent>
        );
      }

      return next();
    }
  };
}
