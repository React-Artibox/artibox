import React from 'react';
import { RichEditor } from './rich-editor';
import { Icons } from './icons';

export default { title: 'Artibox' };

export const RichEditorStory = () => <RichEditor />;

RichEditorStory.story = {
  name: 'Rich Editor'
};

export const IconsStory = () => <Icons />;

IconsStory.story = {
  name: 'Icons'
};
