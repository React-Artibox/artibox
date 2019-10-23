import { QueryFunc, CommandFunc } from 'slate';
import { Plugin as SlateReactPlugin } from 'slate-react';
import { RenderMethodNames } from './renderer';

export type CommonPlugin = Omit<SlateReactPlugin, RenderMethodNames>;

export interface Plugin<Q extends string, C extends string> extends CommonPlugin {
  queries: {
    [k in Q]: QueryFunc;
  };
  commands: {
    [k in C]: CommandFunc;
  };
}

export type HelperPlugin<Q extends string, C extends string, K extends keyof Plugin<Q, C>> = {
  [key in K]: Exclude<Plugin<Q, C>[key], undefined>;
};

export type MarkPlugin<Q extends string, C extends string> = Plugin<Q, C>;
