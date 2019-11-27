import React from 'react';
import { RichEditor } from './rich-editor';
import { JsxSerializer } from './jsx-serializer';
import { Icons } from './icons';

export default { title: 'Artibox' };

export const RichEditorStory = () => <RichEditor />;

RichEditorStory.story = {
  name: 'Rich Editor'
};

export const JsxSerializerStory = () => <JsxSerializer />;

JsxSerializerStory.story = {
  name: 'Jsx Serializer'
};

export const IconsStory = () => <Icons />;

IconsStory.story = {
  name: 'Icons'
};
