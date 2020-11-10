import { EmbedStrategies } from './typings';

export function serializeEmbedCode<P extends string>(
  embedCode: string,
  strategies: EmbedStrategies<P>,
  providers: P[]
): [P, any] | undefined {
  for (const provider of providers) {
    const strategy = strategies[provider];
    const data = strategy.serialize(embedCode);

    if (data) {
      return [provider, data];
    }
  }
}
