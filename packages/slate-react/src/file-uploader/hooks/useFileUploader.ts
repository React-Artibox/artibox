import { useLayoutEffect, useState } from 'react';
import { ReactEditor, useEditor } from 'slate-react';
import { FileUploaderElement } from '@artibox/slate-common/file-uploader';

export function useFileUploader(element: FileUploaderElement) {
  const [percentage, setPercentage] = useState(0);
  const editor = useEditor();

  useLayoutEffect(() => element.register(() => ReactEditor.findPath(editor, element), setPercentage), [element]);

  return {
    percentage
  };
}
