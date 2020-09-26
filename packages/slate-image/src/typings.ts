import { Block } from 'slate';
import { RenderAttributes, Editor } from 'slate-react';
import { ImageController } from './controller';
import { RendererBaseComponent } from '@artibox/slate-common';

export interface HostingResolvers {
  [type: string]: (url: string) => string;
}

export interface WithHostingResolvers {
  hostingResolvers: HostingResolvers;
}

export interface WithThresholds {
  thresholds: number[];
}

export interface ImageTypes {
  figure: string;
  image: string;
  caption: string;
}

export type ImageComponents = {
  figure: RendererBaseComponent<ImageFigurePropsForRenderer>;
  image: RendererBaseComponent<ImagePropsForRenderer>;
  caption: RendererBaseComponent<ImageCaptionPropsForRenderer>;
};

export interface ImageStyle {
  width?: string;
}

export interface ImageProps extends RenderAttributes {
  src: string;
  style?: ImageStyle;
}

export interface ImageFigurePropsForRenderer {
  isBlurred: boolean;
}

export interface ImagePropsForRenderer extends ImageProps, Partial<WithThresholds> {
  controller: ImageController;
  editor: Editor;
  isSelected: boolean;
  node: Block;
}

export interface ImageCaptionPropsForRenderer {
  isEmpty: boolean;
}
