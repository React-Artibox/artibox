import { ReactEditor, useEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { FileUploaderUploadOptions } from '@artibox/slate-common/file-uploader';
import { ReactFileUploader } from '../typings';

export function useFileUploaderTool(controller: ReactFileUploader, options: FileUploaderUploadOptions) {
  const editor = useEditor() as ReactEditor & HistoryEditor;

  return {
    onClick: () => controller.upload(editor, options)
  };
}
