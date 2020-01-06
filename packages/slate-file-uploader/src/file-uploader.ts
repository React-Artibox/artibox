import { Editor, Block, Inline } from 'slate';
import { Context, useContext, useCallback } from 'react';
import { NodeType, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { readFileAsDataURL } from '@artibox/utils/read-file-as-data-url';
import { FILE_UPLOADER_TYPE } from './constants';
import { GetFilesFromInputConfig, getFilesFromInput } from './utils/get-files-from-input';
import { xhrUpload, XHRUploadHeaders } from './utils/xhr-upload';
import { FileUploaderController, createFileUploaderController } from './controller';
import { CreateFileUploaderPlaceholderRendererConfig, createFileUploaderPlaceholderRenderer } from './renderer';
import FileUploaderPlaceholder from './components/file-uploader-placeholder';
import { createFileUploaderSchema } from './schema';

export type FileUploaderForPluginConfig = Partial<CreateFileUploaderPlaceholderRendererConfig>;

export type FileUploader = NodeType &
  FileUploaderController &
  ForPlugin<FileUploaderForPluginConfig> &
  ForToolHook<undefined>;

export interface CreateFileUploaderConfig extends Partial<NodeType>, GetFilesFromInputConfig {
  body?: BodyInit | ((file: File) => BodyInit);
  /**
   * The creator of slate node for each mime.
   * `dataURL` for uploading.
   * `response` for uploaded.
   */
  createNode: {
    [mime: string]: {
      dataURL: (dataURL: string) => Block | Inline;
      response: (response: any) => Block | Inline;
    };
  };
  headers?: XHRUploadHeaders | ((file: File) => XHRUploadHeaders);
  headersContext?: Context<XHRUploadHeaders | undefined>;
  url: string | ((file: File) => string);
}

export function createFileUploader(config: CreateFileUploaderConfig): FileUploader {
  const {
    accept,
    body: bodyOrGetter = (file: File) => file,
    createNode,
    headers: headersOrGetter,
    headersContext,
    multiple,
    type = FILE_UPLOADER_TYPE,
    url: urlOrGetter
  } = config;

  const controller = createFileUploaderController({ type });

  async function triggerUpload(editor: Editor, otherHeaders?: XHRUploadHeaders) {
    const files = await getFilesFromInput({ accept, multiple });

    if (!files) {
      return;
    }

    files.forEach(async file => {
      const url = typeof urlOrGetter === 'string' ? urlOrGetter : urlOrGetter(file);
      const body = typeof bodyOrGetter === 'function' ? bodyOrGetter(file) : bodyOrGetter;
      const headers = {
        ...(typeof headersOrGetter === 'function' ? headersOrGetter(file) : headersOrGetter),
        ...otherHeaders
      };
      const [mime] = file.type.split('/');
      const { dataURL: createNodeByDataURL, response: createNodeByResponse } = createNode[mime];
      const dataURL = await readFileAsDataURL(file);
      const uploadingNode = createNodeByDataURL(dataURL);
      const block = controller.add(editor, uploadingNode);

      try {
        const response = await xhrUpload(url, {
          body,
          headers,
          onProgress: percentage => controller.setPercentage(editor, block, percentage)
        });

        editor.replaceNodeByKey(block.key, createNodeByResponse(response));
      } catch (error) {
        /**
         * @todo
         */
        console.error(error);
      }
    });
  }

  return {
    type,
    ...controller,
    forPlugin(config) {
      const { component = FileUploaderPlaceholder } = config || {};
      return {
        ...createFileUploaderPlaceholderRenderer({ type, component }),
        schema: createFileUploaderSchema({ type })
      };
    },
    forToolHook: () => editor => {
      const headersFromContext = headersContext ? useContext(headersContext) : undefined;

      return {
        onClick: useCallback(() => triggerUpload(editor, headersFromContext), [headersFromContext])
      };
    }
  };
}
