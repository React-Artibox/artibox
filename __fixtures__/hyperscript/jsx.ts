import { createHyperscript } from 'slate-hyperscript';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph';
import { BLOCKQUOTE_TYPE } from '@artibox/slate-common/blockquote';
import { HEADING_TYPE } from '@artibox/slate-common/heading';
import { DIVIDER_TYPE } from '@artibox/slate-common/divider';
import { createText } from './creators';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

export const jsx = createHyperscript({
  elements: {
    inline: { inline: true },
    void: { void: true },
    hp: { type: PARAGRAPH_TYPE },
    hblockquote: { type: BLOCKQUOTE_TYPE },
    hh1: { type: HEADING_TYPE, level: 1 },
    hh2: { type: HEADING_TYPE, level: 2 },
    hh3: { type: HEADING_TYPE, level: 3 },
    hh4: { type: HEADING_TYPE, level: 4 },
    hh5: { type: HEADING_TYPE, level: 5 },
    hh6: { type: HEADING_TYPE, level: 6 },
    hhr: { type: DIVIDER_TYPE }
  },
  creators: {
    htext: createText
  }
});
