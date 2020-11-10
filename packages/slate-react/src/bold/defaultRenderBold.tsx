import React from 'react';
import { RenderMarkPropsBase } from '../_internal/renderer/typings';

export const defaultRenderBold = ({ children }: RenderMarkPropsBase<boolean>) => <strong>{children}</strong>;
