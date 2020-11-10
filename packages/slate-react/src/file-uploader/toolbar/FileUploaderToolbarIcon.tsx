import React from 'react';
import { FileUploaderUploadOptions } from '@artibox/slate-common/file-uploader';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactFileUploader } from '../typings';
import { useFileUploaderTool } from './useFileUploaderTool';

export interface FileUploaderToolbarIconProps extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactFileUploader;
  options: FileUploaderUploadOptions;
}

function FileUploaderToolbarIcon(props: FileUploaderToolbarIconProps) {
  const { controller, options, ...rest } = props;
  const { onClick } = useFileUploaderTool(controller, options);

  return <ToolbarIcon {...rest} onClick={onClick} />;
}

export default FileUploaderToolbarIcon;
