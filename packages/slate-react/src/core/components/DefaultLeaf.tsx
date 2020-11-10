import React from 'react';
import { RenderLeafProps } from '../typings/renderer';

const DefaultLeaf = ({ attributes, children }: RenderLeafProps) => <span {...attributes}>{children}</span>;

export default DefaultLeaf;
