import { Plugin } from 'slate-react';
import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { getFileUploaderPlaceholderPropsFromBlock } from './utils/get-file-uploader-placeholder-props-from-block';
import { FileUploaderPlaceholderProps } from './typings';

export type CreateFileUploaderPlaceholderRendererConfig = Pick<
  CreateCommonBlockRendererConfig<FileUploaderPlaceholderProps>,
  'type' | 'component'
>;

export function createFileUploaderPlaceholderRenderer(config: CreateFileUploaderPlaceholderRendererConfig): Plugin {
  const { type, component } = config;

  return createCommonBlockRenderer({
    type,
    component,
    getProps: props => getFileUploaderPlaceholderPropsFromBlock(props.node)
  });
}
