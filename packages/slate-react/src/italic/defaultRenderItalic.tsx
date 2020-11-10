import React from 'react';
import { RenderMarkPropsBase } from '../_internal/renderer/typings';

export const defaultRenderItalic = ({ children }: RenderMarkPropsBase<boolean>) => <i>{children}</i>;
