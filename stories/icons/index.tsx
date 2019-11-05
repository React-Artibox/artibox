import React from 'react';
import {
  Icon,
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
  SeparationLine,
  Strikethrough,
  Underline,
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
  SeparationLine,
  Strikethrough,
  Underline,
  Video
];

export function Icons() {
  return (
    <div className="icons">
      {icons.map(icon => (
        <Icon key={icon.name} icon={icon} />
      ))}
    </div>
  );
}
