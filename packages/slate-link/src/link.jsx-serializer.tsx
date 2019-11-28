import { Inline } from 'slate';
import { CreateJsxSerializerRuleConfig, createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { LINK_TYPE, LINK_COMPONENT } from './link.constants';
import { getLinkPropsFromInline } from './link.utils';

export type CreateLinkJsxSerializerRuleConfig = Partial<
  Pick<CreateJsxSerializerRuleConfig<Inline>, 'type' | 'component'>
>;

export function createLinkJsxSerializerRule(config?: CreateLinkJsxSerializerRuleConfig) {
  const { type = LINK_TYPE, component = LINK_COMPONENT } = config || {};
  return createJsxSerializerRule<Inline>({ type, component, getProps: getLinkPropsFromInline });
}
