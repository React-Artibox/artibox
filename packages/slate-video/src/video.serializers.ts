import { VIDEO_PROVIDERS } from './video.constants';

export interface VideoSerializeResult {
  src: string;
  provider: VIDEO_PROVIDERS;
}

export interface VideoSerialize {
  (src: string): VideoSerializeResult | null;
  template: string;
  reg: RegExp;
}

export interface VideoSerializer {
  serialize: VideoSerialize;
  deserialize: VideoSerialize;
}

export type VideoSerializers = {
  [p in VIDEO_PROVIDERS]: VideoSerializer;
};

function createVideoSerialize(provider: VIDEO_PROVIDERS, config: [string, RegExp]): VideoSerialize {
  const [template, reg] = config;
  const serialize: VideoSerialize = src => {
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

function createVideoSerializer(
  provider: VIDEO_PROVIDERS,
  serialize: [string, RegExp],
  deserialize: [string, RegExp] = serialize
): VideoSerializer {
  return {
    serialize: createVideoSerialize(provider, serialize),
    deserialize: createVideoSerialize(provider, deserialize)
  };
}

export const videoSerializers: VideoSerializers = {
  youtube: createVideoSerializer(
    'youtube',
    ['https://www.youtube.com/embed/{{id}}', /^https:\/\/www.youtube.com\/watch\?v=([\w-]*)/i],
    ['https://www.youtube.com/watch?v={{id}}', /^https:\/\/www.youtube.com\/embed\/([\w-]*)/i]
  ),
  vimeo: createVideoSerializer(
    'vimeo',
    ['https://player.vimeo.com/video/{{id}}', /^https:\/\/vimeo.com\/([\w-]*)/i],
    ['https://vimeo.com/{{id}}', /^https:\/\/player.vimeo.com\/video\/([\w-]*)/i]
  )
};

export function serializeVideoSource(src: string): VideoSerializeResult | undefined {
  let ret: VideoSerializeResult | undefined;

  for (let i = 0; i < VIDEO_PROVIDERS.length; i++) {
    const provider = VIDEO_PROVIDERS[i];
    const result = videoSerializers[provider].serialize(src);

    if (result) {
      ret = result;
      break;
    }
  }

  return ret;
}
