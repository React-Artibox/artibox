import React from 'react';
import { Icon } from '@artibox/components';
import {
  AlighLeft,
  AlighCenter,
  AlighRight,
  Blockquote,
  Bold,
  Erase,
  Facebook,
  Heading1,
  Heading2,
  Highlight,
  Image,
  Instagram,
  Italic,
  Link,
  OrderedList,
  SeparationLine,
  Strikethrough,
  Underline,
  Unlink,
  UnorderedList,
  Video
} from '@artibox/icons';
import './icons.scss';

const icons = [
  AlighLeft,
  AlighCenter,
  AlighRight,
  Blockquote,
  Bold,
  Erase,
  Facebook,
  Heading1,
  Heading2,
  Highlight,
  Image,
  Instagram,
  Italic,
  Link,
  OrderedList,
  SeparationLine,
  Strikethrough,
  Underline,
  Unlink,
  UnorderedList,
  Video
];

export function Icons() {
  return (
    <div className="icons">
      {icons.map(icon => (
        <div key={icon.name} className="icon-container">
          <div>
            <Icon icon={icon} />
          </div>
          {icon.name}
        </div>
      ))}
    </div>
  );
}
