import { Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';
import { readFileAsDataURL } from '@artibox/utils/readFileAsDataURL';
import { Paragraph } from '../paragraph';
import { FILE_UPLOADER_TYPE } from './constants';
import { getFilesFromInput } from './getFilesFromInput';
import { FileUploader, FileUploaderElement } from './typings';

export interface CreateFileUploaderOptions {
  type?: string;
}

export function createFileUploader(options: CreateFileUploaderOptions = {}): FileUploader {
  const { type = FILE_UPLOADER_TYPE } = options;
  const createFileUploaderElement: FileUploader['createFileUploaderElement'] = async (editor, file, options) => {
    const { createElement, getBody, getHeaders, getUrl } = options;

    const [mime] = file.type.split('/');
    const createByMime = createElement[mime];

    if (!createByMime) {
      return;
    }

    const { dataURL: createElementByDataURL, response: createElementByResponse } = createByMime;
    const headers = await getHeaders?.(file);
    const xhr = new XMLHttpRequest();
    const dataURL = await readFileAsDataURL(file);
    let sent = false;
    const fileUploaderElement: FileUploaderElement = {
      type,
      register: (getPath, onProgress) => {
        xhr.onload = () => {
          if (xhr.status < 400) {
            const path = getPath();

            if (path) {
              HistoryEditor.withoutSaving(editor, () => {
                Transforms.removeNodes(editor, { at: path });
                Transforms.insertNodes(editor, createElementByResponse(xhr.response), { at: path });
              });
            }
          } else {
            throw xhr.response;
          }
        };
        xhr.upload.onprogress = ({ loaded, total }) => onProgress((loaded * 100) / total);

        if (!sent) {
          sent = true;
          xhr.send(getBody(file));
        }

        return () => {
          xhr.onload = null;
          xhr.upload.onprogress = null;
        };
      },
      children: [createElementByDataURL(dataURL)]
    };

    xhr.open('POST', getUrl(file));

    if (headers) {
      for (const headerName in headers) {
        xhr.setRequestHeader(headerName, headers[headerName]);
      }
    }

    return fileUploaderElement;
  };
  const upload: FileUploader['upload'] = async (editor, options) => {
    const { accept, multiple } = options;
    const files = await getFilesFromInput({ accept, multiple });

    if (!files) {
      return;
    }

    files.reduce(async (prev, file) => {
      await prev;
      return createFileUploaderElement(editor, file, options).then(fileUploaderElement => {
        if (fileUploaderElement) {
          HistoryEditor.withoutSaving(editor, () => {
            Transforms.insertNodes(editor, [fileUploaderElement, Paragraph.createParagraphElement()], options);
            Transforms.move(editor);
          });
        }
      });
    }, Promise.resolve());
  };

  return {
    type,
    createFileUploaderElement,
    upload,
    with(editor) {
      // const { isVoid } = editor;
      // editor.isVoid = element => element.type === type || isVoid(element);
      return editor;
    }
  };
}
