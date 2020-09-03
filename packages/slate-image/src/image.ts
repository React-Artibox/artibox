import { useCallback } from 'react';
import { NodeType, InputConfig, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { IMAGE_TYPE } from './constants';
import { WithHostingResolvers, WithThresholds } from './typings';
import Image from './components/image';
import { createImageController, ImageController } from './controller';
import { CreateImageRendererConfig, createImageRenderer } from './renderer';
import { createImageHandlers } from './handlers';
import { createImageSchema } from './schemta';

export type ImageForPluginConfig = Partial<CreateImageRendererConfig>;

export type Image = NodeType & ImageController & ForPlugin<ImageForPluginConfig> & ForToolHook<undefined>;

export type CreateImageConfig = Partial<NodeType & WithHostingResolvers & WithThresholds>;

export function createImage(config?: CreateImageConfig): Image {
  const { type = IMAGE_TYPE, hostingResolvers, thresholds: unresolvedThresholds } = config || {};
  const thresholds = unresolvedThresholds
    ? [...unresolvedThresholds.filter(threshold => threshold > 0 && threshold < 100).sort(), 100]
    : undefined;
  const controller = createImageController({ type, hostingResolvers, thresholds });
  return {
    type,
    ...controller,
    forPlugin(config) {
      const { component = Image } = config || {};
      return {
        ...createImageRenderer({ type, component, controller, hostingResolvers, thresholds }),
        ...createImageHandlers({ controller }),
        schema: createImageSchema({ type, thresholds })
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
