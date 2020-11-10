import React from 'react';
import FileUploader from './components/FileUploader';
import { RenderFileUploaderElement } from './typings';

export const defaultRenderFileUploaderElement: RenderFileUploaderElement = props => <FileUploader {...props} />;
