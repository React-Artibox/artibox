import { Editor, Element, Path } from 'slate';
import { HistoryEditor } from 'slate-history';
import { TransformsInsertNodesOptions } from '../typings/transforms';
import { Withable } from '../typings/with';
import { GetFilesFromInputOptions } from './getFilesFromInput';

export interface XHRUploadHeaders {
  [name: string]: string;
}

export interface FileUploaderElement extends Element {
  type: string;
  register: (getPath: () => Path | undefined, onProgress: (percentage: number) => void) => VoidFunction;
}

/**
 * For creating temorary element while uploading.
 */
export type FileUploaderCreateElementByDataURL = (dataURL: string) => Element;
/**
 * For create element after uploaded.
 */
export type FileUploaderCreateElementByResponse = (response: any) => Element;

export type FileUploaderGetBody = (file: File) => BodyInit;
export type FileUploaderGetHeaders = (file: File) => XHRUploadHeaders | Promise<XHRUploadHeaders>;
export type FileUploaderGetUrl = (file: File) => string;

export interface FileUploaderCreateFileUploaderElementOptions {
  createElement: {
    [mime in string]?: {
      dataURL: FileUploaderCreateElementByDataURL;
      response: FileUploaderCreateElementByResponse;
    };
  };
  getBody: FileUploaderGetBody;
  getHeaders?: FileUploaderGetHeaders;
  getUrl: FileUploaderGetUrl;
}

export type FileUploaderUploadOptions = FileUploaderCreateFileUploaderElementOptions &
  GetFilesFromInputOptions &
  TransformsInsertNodesOptions;

export interface FileUploader extends Withable {
  type: string;
  createFileUploaderElement(
    editor: Editor & HistoryEditor,
    file: File,
    options: FileUploaderCreateFileUploaderElementOptions
  ): Promise<FileUploaderElement | undefined>;
  upload(editor: Editor & HistoryEditor, options: FileUploaderUploadOptions): Promise<void>;
}
