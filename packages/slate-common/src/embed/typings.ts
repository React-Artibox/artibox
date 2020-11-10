import { Editor, Node } from 'slate';
import { Withable } from '../typings/with';
import { EmbedStrategies } from './common';

export interface Embed<P extends string> extends Withable {
  type: string;
  strategies: EmbedStrategies<P>;
  insertEmbed(editor: Editor, providers: P[], embedCode: string, defaultNode?: Node | string): void;
}
