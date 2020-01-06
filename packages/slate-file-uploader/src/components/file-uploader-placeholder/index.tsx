import React, { forwardRef } from 'react';
import Progress from '@artibox/components/Progress';
import { FileUploaderPlaceholderProps } from '../../typings';
import '../../styles';

const FileUploaderPlaceholder = forwardRef<HTMLDivElement, FileUploaderPlaceholderProps>(
  function FileUploaderPlaceholder(props, ref) {
    const { children, percentage, ...rest } = props;

    return (
      <div ref={ref} className="artibox-file-uploader__placeholder" {...rest}>
        <div className="artibox-file-uploader__placeholder__backdrop" contentEditable={false}>
          <Progress className="artibox-file-uploader__placeholder__progress" percentage={percentage} />
        </div>
        {children}
      </div>
    );
  }
);

export default FileUploaderPlaceholder;
