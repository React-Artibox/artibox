import { Block } from 'slate';
import { PARAGRAPH_TYPE, RendererBaseComponent } from '@artibox/slate-common';
import { VIDEO_TYPE, VIDEO_DATA_KEY_PROVIDER } from './video.constants';
import { VideoController } from './video.interfaces';
import { serializeVideoSource } from './video.serializers';
import VideoComponent, { VideoProps } from './video.component';
import { VideoRenderer } from './video.renderer';
import { VideoSchema } from './video.schema';

export interface VideoConfig {
  type?: string;
  component?: RendererBaseComponent<VideoProps>;
}

export class Video implements VideoController {
  static Renderer = VideoRenderer;
  static Schema = VideoSchema;

  static create(config?: VideoConfig) {
    const type = config?.type ?? VIDEO_TYPE;
    const component = config?.component ?? VideoComponent;

    return new this(type, this.Renderer({ type, component }), this.Schema(type));
  }

  plugin = {
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly type: string,
    private readonly renderer: VideoRenderer,
    private readonly schema: ReturnType<typeof VideoSchema>
  ) {}

  createVideoBlock: VideoController['createVideoBlock'] = ({ provider, src }) =>
    Block.fromJSON({
      type: this.type,
      data: {
        [VIDEO_DATA_KEY_PROVIDER]: provider,
        [provider]: src
      }
    });

  addVideoBlock: VideoController['addVideoBlock'] = (editor, source) => {
    const result = serializeVideoSource(source);

    if (!result) {
      return editor;
    }

    return editor.insertBlock(this.createVideoBlock(result)).insertBlock(PARAGRAPH_TYPE);
  };
}
