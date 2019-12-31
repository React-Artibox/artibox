import { RenderAttributes, Editor } from 'slate-react';
import { ImageController } from './controller';

export interface HostingResolvers {
  [type: string]: (url: string) => string;
}

export interface WithHostingResolvers {
  hostingResolvers: HostingResolvers;
}

export interface WithThresholds {
  thresholds: number[];
}

export interface ImageStyle {
  width?: string | number;
}

export interface ImageProps extends RenderAttributes {
  src: string;
  style?: ImageStyle;
}

export interface ImagePropsForRenderer extends ImageProps, Partial<WithThresholds> {
  controller: ImageController;
  editor: Editor;
  isSelected: boolean;
}
