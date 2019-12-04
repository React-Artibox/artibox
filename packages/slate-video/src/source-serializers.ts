import { VIDEO_PROVIDERS } from './constants';
import { VideoProvider } from './typings';

export interface VideoSourceSerializeResult {
  id: string;
  provider: VideoProvider;
}

export interface VideoSourceSerializer {
  serialize(src: string): VideoSourceSerializeResult | null;
  deserialize(id: string): string;
}

export type VideoSourceSerializers = {
  [p in VideoProvider]: VideoSourceSerializer;
};

type CreateVideoSourceSerializerConfig = {
  [p in VideoProvider]: {
    reg: RegExp;
    template: string;
  };
};

function createVideoSourceSerializers(config: CreateVideoSourceSerializerConfig): VideoSourceSerializers {
  return (Object.keys(config) as VideoProvider[]).reduce((serializers, provider) => {
    const { reg, template } = config[provider];
    serializers[provider] = {
      serialize: src => {
        const result = reg.exec(src);
        if (!result) {
          return null;
        }

        const [, id] = result;
        return { id, provider };
      },
      deserialize: id => template.replace('{{id}}', id)
    };
    return serializers;
  }, {} as VideoSourceSerializers);
}

export const videoSourceSerializers = createVideoSourceSerializers({
  youtube: {
    reg: /^https:\/\/www.youtube.com\/watch\?v=([\w-]*)/i,
    template: 'https://www.youtube.com/embed/{{id}}'
  },
  vimeo: {
    reg: /^https:\/\/vimeo.com\/([\w-]*)/i,
    template: 'https://player.vimeo.com/video/{{id}}'
  }
});

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
