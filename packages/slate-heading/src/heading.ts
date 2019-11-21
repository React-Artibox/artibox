import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { HEADING_TYPE, HEADING_LEVELS, HEADING_HOTKEY } from './heading.constants';
import { getHeadingLevelFromBlock, createHeadingBlock } from './heading.utils';
import { HeadingHandlers } from './heading.handlers';
import { HeadingRenderer } from './heading.renderer';
import { HeadingSchema } from './heading.schema';
import { HeadingController } from './heading.interfaces';

export interface HeadingConfig {
  type?: string;
  /**
   * If the hotkey is `ctrl+opt`, the level 1 hotkey will be `ctrl+opt+1`, and so on.
   */
  hotkey?: string;
  /**
   * The blacklist of heading levels.
   * If no pass, all levels will be enabled.
   */
  disabled?: HEADING_LEVELS[];
}

export class Heading implements HeadingController {
  static Handlers = HeadingHandlers;
  static Renderer = HeadingRenderer;
  static Schema = HeadingSchema;

  static create(config?: HeadingConfig) {
    const disabled = config?.disabled ?? [];
    const enabled = HEADING_LEVELS.filter(level => !disabled.includes(level));
    const type = config?.type ?? HEADING_TYPE;
    const hotkey = config?.hotkey ?? HEADING_HOTKEY;

    return new this(
      type,
      heading => this.Handlers(hotkey, enabled, heading),
      this.Renderer(type),
      this.Schema({ type, enabled })
    );
  }

  plugin = {
    ...this.handlersFactory(this),
    ...this.renderer,
    schema: this.schema
  };

  constructor(
    public readonly type: string,
    private readonly handlersFactory: (headingController: HeadingController) => HeadingHandlers,
    private readonly renderer: HeadingRenderer,
    private readonly schema: ReturnType<typeof HeadingSchema>
  ) {}

  isBlockAsHeading: HeadingController['isBlockAsHeading'] = block => block?.type === this.type;

  isSelectionInHeading: HeadingController['isSelectionInHeading'] = (editor, level) =>
    editor.value.blocks.some(block => this.isBlockAsHeading(block) && getHeadingLevelFromBlock(block) === level);

  getCurrentHeadingLevel: HeadingController['getCurrentHeadingLevel'] = editor => {
    const currentBlock = editor.value.startBlock;

    if (!this.isBlockAsHeading(currentBlock)) {
      return undefined;
    }

    const level = getHeadingLevelFromBlock(currentBlock);

    if (typeof level === 'number') {
      return level as HEADING_LEVELS;
    }

    return undefined;
  };

  endHeadingBlock: HeadingController['endHeadingBlock'] = editor => {
    const currentBlock = editor.value.startBlock;

    if (!this.isBlockAsHeading(currentBlock)) {
      return editor;
    }

    return editor.splitBlock().setBlocks(PARAGRAPH_TYPE);
  };

  toggleHeadingBlock: HeadingController['toggleHeadingBlock'] = (editor, level) => {
    const currentLevel = this.getCurrentHeadingLevel(editor);
    const block = currentLevel !== level ? createHeadingBlock(this.type, level) : PARAGRAPH_TYPE;
    return editor.setBlocks(block);
  };
}
