export interface GetFilesFromInputOptions {
  accept?: string[];
  multiple?: boolean;
}

export function getFilesFromInput(options: GetFilesFromInputOptions = {}) {
  const { accept, multiple } = options;

  return new Promise<File[] | undefined>(resolve => {
    const inputEl = document.createElement('input');

    if (accept) {
      inputEl.accept = accept.join(',');
    }

    inputEl.multiple = !!multiple;
    inputEl.type = 'file';

    inputEl.addEventListener('change', () => {
      const { files: fileList } = inputEl;

      if (!fileList || !fileList.length) {
        resolve();
      } else {
        const files: File[] = [];

        for (const file of fileList) {
          files.push(file);
        }

        resolve(files);
      }
    });

    inputEl.click();
  });
}
