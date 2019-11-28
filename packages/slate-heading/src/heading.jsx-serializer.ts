import { Block } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { HEADING_TYPE } from './heading.constants';
import { HeadingProps } from './heading.types';
import { getHeadingPropsFromBlock } from './heading.utils';
import Heading from './heading.component';

export type CreateHeadingJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Block, HeadingProps>, 'type' | 'component'>
>;

export function createHeadingJsxSerializerRule(config?: CreateHeadingJsxSerializerRuleConfig) {
  const { type = HEADING_TYPE, component = Heading } = config || {};
  return createJsxSerializerRule<Block, HeadingProps>({
    type,
    component,
    getProps: getHeadingPropsFromBlock
  });
}
