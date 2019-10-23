import { Plugin as SlateReactPlugin } from 'slate-react';
import { RenderMethodNames } from './renderer';

export type Plugin = Omit<SlateReactPlugin, RenderMethodNames>;

export type HelperPlugin<K extends keyof Plugin> = {
  [key in K]: Exclude<Plugin[key], undefined>;
};

export type MarkPlugin = Plugin;
