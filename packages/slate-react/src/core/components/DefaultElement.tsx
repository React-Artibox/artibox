import React from 'react';
import { RenderElementProps } from '../typings/renderer';

const DefaultElement = ({ attributes, children }: RenderElementProps) => <div {...attributes}>{children}</div>;

export default DefaultElement;
