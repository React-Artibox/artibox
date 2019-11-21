import { Block, Editor } from 'slate';
import { VideoSerializeResult } from './video.serializers';

export interface VideoController {
  createVideoBlock(result: VideoSerializeResult): Block;
  addVideoBlock(editor: Editor, source: string): Editor;
}
