import { Plugin } from 'slate-react';

/**
 * @example
 *
 * type BlockRenderer = PickPluginAndRequired<'renderBlock'> === {
 *  renderBlock: (props: RenderBlockProps, editor: Editor, next: () => any) => any;
 * }
 */
export type PickPluginAndRequired<K extends keyof Plugin> = Pick<Required<Plugin>, K>;
