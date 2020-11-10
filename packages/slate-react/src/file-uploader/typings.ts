import { FileUploader, FileUploaderElement } from '@artibox/slate-common/file-uploader';
import { RenderElementProps, WithCreateRenderElement } from '../core';

export type RenderFileUploaderElementProps = RenderElementProps<FileUploaderElement>;

export type RenderFileUploaderElement = (props: RenderFileUploaderElementProps) => JSX.Element | null | undefined;

export interface FileUploaderCreateRenderElementOptions {
  render?: RenderFileUploaderElement;
}

export type ReactFileUploader = FileUploader & WithCreateRenderElement<[FileUploaderCreateRenderElementOptions?]>;
