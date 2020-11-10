import React from 'react';
import { RenderMarkPropsBase } from '../_internal/renderer/typings';

export const defaultRenderStrikethrough = ({ children }: RenderMarkPropsBase<boolean>) => <del>{children}</del>;
