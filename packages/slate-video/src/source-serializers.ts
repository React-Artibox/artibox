import { VIDEO_PROVIDERS } from './constants';

export interface VideoSourceSerializeResult {
  src: string;
  provider: VIDEO_PROVIDERS;
}

export interface VideoSourceSerialize {
  (src: string): VideoSourceSerializeResult | null;
  template: string;
  reg: RegExp;
}

export interface VideoSourceSerializer {
  serialize: VideoSourceSerialize;
  deserialize: VideoSourceSerialize;
}

export type VideoSourceSerializers = {
  [p in VIDEO_PROVIDERS]: VideoSourceSerializer;
};

function createVideoSourceSerialize(provider: VIDEO_PROVIDERS, config: [string, RegExp]): VideoSourceSerialize {
  const [template, reg] = config;
  const serialize: VideoSourceSerialize = src => {
    const result = reg.exec(src);
    if (!result) {
      return null;
    }

    const [, id] = result;
    return {
      src: template.replace('{{id}}', id),
      provider
    };
  };

  serialize.template = template;
  serialize.reg = reg;

  return serialize;
}

function createVideoSourceSerializer(
  provider: VIDEO_PROVIDERS,
  serialize: [string, RegExp],
  deserialize: [string, RegExp] = serialize
): VideoSourceSerializer {
  return {
    serialize: createVideoSourceSerialize(provider, serialize),
    deserialize: createVideoSourceSerialize(provider, deserialize)
  };
}

export const videoSourceSerializers: VideoSourceSerializers = {
  youtube: createVideoSourceSerializer(
    'youtube',
    ['https://www.youtube.com/embed/{{id}}', /^https:\/\/www.youtube.com\/watch\?v=([\w-]*)/i],
    ['https://www.youtube.com/watch?v={{id}}', /^https:\/\/www.youtube.com\/embed\/([\w-]*)/i]
  ),
  vimeo: createVideoSourceSerializer(
    'vimeo',
    ['https://player.vimeo.com/video/{{id}}', /^https:\/\/vimeo.com\/([\w-]*)/i],
    ['https://vimeo.com/{{id}}', /^https:\/\/player.vimeo.com\/video\/([\w-]*)/i]
  )
};

export function serializeVideoSource(src: string): VideoSourceSerializeResult | undefined {
  let ret: VideoSourceSerializeResult | undefined;

  for (let i = 0; i < VIDEO_PROVIDERS.length; i++) {
    const provider = VIDEO_PROVIDERS[i];
    const result = videoSourceSerializers[provider].serialize(src);

    if (result) {
      ret = result;
      break;
    }
  }

  return ret;
}
