import { Plugin, MarkPlugin } from './plugin';
import { Renderer, MarkRenderer } from './renderer';

export interface Module<P extends Plugin, R extends Renderer> {
  plugins: P | P[];
  renderer: R;
}

export type MarkModule = Module<MarkPlugin, MarkRenderer>;
