import React from 'react';
import { RenderMarkPropsBase } from '../_internal/renderer/typings';

export const defaultRenderUnderline = ({ children }: RenderMarkPropsBase<boolean>) => <u>{children}</u>;
