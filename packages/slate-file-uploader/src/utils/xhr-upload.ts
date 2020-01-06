export interface XHRUploadHeaders {
  [name: string]: string;
}

export interface XHRUploadConfig {
  body?: BodyInit;
  headers?: XHRUploadHeaders;
  onProgress?: (percentage: number) => void;
}

export type XHRUpload = (url: string, config?: XHRUploadConfig) => Promise<any>;

export function xhrUpload(url: string, config?: XHRUploadConfig): Promise<any> {
  const { body, headers, onProgress } = config || {};
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);

    if (onProgress) {
      onProgress(0);
      xhr.upload.onprogress = ({ loaded, total }) => onProgress((loaded * 100) / total);
    }

    xhr.onload = () => {
      if (onProgress) {
        onProgress(100);
      }

      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    if (headers) {
      Object.entries(headers).forEach(([name, value]) => xhr.setRequestHeader(name, value));
    }

    xhr.send(body);
  });
}
