import React from 'react';
import Progress from '../../components/Progress';
import { RenderFileUploaderElementProps } from '../typings';
import { useFileUploader } from '../hooks/useFileUploader';
import './file-uploader.styles';

function FileUploader(props: RenderFileUploaderElementProps) {
  const { attributes, children, element } = props;
  const { percentage } = useFileUploader(element);

  return (
    <div {...attributes} className="artibox-file-uploader" contentEditable={false}>
      <div className="artibox-file-uploader__backdrop">
        <Progress className="artibox-file-uploader__progress" percentage={percentage} />
      </div>
      {children}
    </div>
  );
}

export default FileUploader;
