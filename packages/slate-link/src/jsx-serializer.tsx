import { InlineJSON } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { LINK_TYPE } from './constants';
import { LinkProps } from './typings';
import { getLinkPropsFromInline } from './utils/get-link-props-from-inline';

export type CreateLinkJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<InlineJSON, LinkProps>, 'type' | 'component'>
>;

export function createLinkJsxSerializerRule(config?: CreateLinkJsxSerializerRuleConfig) {
  const { type = LINK_TYPE, component = 'a' } = config || {};
  return createJsxSerializerRule<InlineJSON, LinkProps>({ type, component, getProps: getLinkPropsFromInline });
}
