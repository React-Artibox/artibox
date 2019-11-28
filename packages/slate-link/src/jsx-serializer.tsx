import { Inline } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { LINK_TYPE, LINK_COMPONENT } from './constants';
import { LinkProps } from './types';
import { getLinkPropsFromInline } from './utils/get-link-props-from-inline';

export type CreateLinkJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Inline, LinkProps>, 'type' | 'component'>
>;

export function createLinkJsxSerializerRule(config?: CreateLinkJsxSerializerRuleConfig) {
  const { type = LINK_TYPE, component = LINK_COMPONENT } = config || {};
  return createJsxSerializerRule<Inline, LinkProps>({ type, component, getProps: getLinkPropsFromInline });
}
