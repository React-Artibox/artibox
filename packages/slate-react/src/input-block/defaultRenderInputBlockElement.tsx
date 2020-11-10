import React from 'react';
import InputBlock from './components/InputBlock';
import { RenderInputBlockElement } from './typings';

export const defaultRenderInputBlockElement: RenderInputBlockElement = props => <InputBlock {...props} />;
