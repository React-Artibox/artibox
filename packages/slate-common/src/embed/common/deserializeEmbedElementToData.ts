import { EmbedElement, EmbedStrategies } from './typings';

export function deserializeEmbedElementToData<P extends string>(
  element: EmbedElement,
  strategies: EmbedStrategies<P>
): [P, any] | undefined {
  const { provider } = element;
  const strategy = provider ? strategies[provider as P] : undefined;

  if (strategy) {
    return [provider as P, strategy.deserialize(element)];
  }
}
