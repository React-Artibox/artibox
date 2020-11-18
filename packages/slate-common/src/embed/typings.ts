import { Editor, Node } from 'slate';
import { WithElementType } from '../typings/element';
import { Withable } from '../typings/with';
import { EmbedStrategies } from './common';

export interface Embed<P extends string> extends WithElementType, Withable {
  strategies: EmbedStrategies<P>;
  insertEmbed(editor: Editor, providers: P[], embedCode: string, defaultNode?: Node | string): void;
}
