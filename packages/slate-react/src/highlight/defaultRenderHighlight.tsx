import React from 'react';
import { RenderMarkPropsBase } from '../_internal/renderer/typings';

export const defaultRenderHighlight = ({ children }: RenderMarkPropsBase<boolean>) => <mark>{children}</mark>;
