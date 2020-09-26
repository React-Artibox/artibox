import { useCallback } from 'react';
import { InputConfig, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { IMAGE_TYPE, IMAGE_FIGURE_TYPE, IMAGE_CAPTION_TYPE } from './constants';
import { WithHostingResolvers, WithThresholds, ImageTypes, ImageComponents } from './typings';
import Image from './components/image';
import ImageFigure from './components/image-figure';
import { createImageController, ImageController } from './controller';
import { CreateImageRendererConfig, createImageRenderer } from './renderer';
import { createImageHandlers } from './handlers';
import { createImageSchema } from './schema';
import ImageCaption from './components/image-caption';

export type ImageForPluginConfig = Partial<Pick<CreateImageRendererConfig, 'components'>>;

export interface Image extends ImageController, ForPlugin<ImageForPluginConfig>, ForToolHook<undefined> {
  types: ImageTypes;
}

export interface CreateImageConfig extends Partial<WithHostingResolvers & WithThresholds> {
  types?: Partial<ImageTypes>;
}

export function createImage(config?: CreateImageConfig): Image {
  const { types: typesConfig, hostingResolvers, thresholds: unresolvedThresholds } = config || {};
  const {
    image: imageType = IMAGE_TYPE,
    figure: figureType = IMAGE_FIGURE_TYPE,
    caption: captionType = IMAGE_CAPTION_TYPE
  } = typesConfig || {};
  const types: ImageTypes = {
    image: imageType,
    figure: figureType,
    caption: captionType
  };
  const thresholds = unresolvedThresholds
    ? [...unresolvedThresholds.filter(threshold => threshold > 0 && threshold < 100).sort(), 100]
    : undefined;
  const controller = createImageController({ types, thresholds });
  return {
    types,
    ...controller,
    forPlugin(config) {
      const { components: componentsConfig } = config || {};
      const {
        image: ImageComponent = Image,
        figure: FigureComponent = ImageFigure,
        caption: CaptionComponent = ImageCaption
      } = componentsConfig || {};
      const components: ImageComponents = {
        image: ImageComponent,
        figure: FigureComponent,
        caption: CaptionComponent
      };
      return {
        ...createImageRenderer({ types, components, controller, hostingResolvers, thresholds }),
        ...createImageHandlers({ controller }),
        schema: createImageSchema({ types, thresholds })
      };
    },
    forToolHook() {
      const inputConfig: InputConfig = {
        getPlaceholder: locale => locale.editor.link.inputPlaceholder,
        onConfirm: controller.insert
      };

      return (editor, setInputConfig) => ({
        onClick: useCallback(() => setInputConfig(inputConfig), [editor])
      });
    }
  };
}
