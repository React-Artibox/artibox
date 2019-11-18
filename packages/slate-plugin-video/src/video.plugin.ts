import { PickPluginAndRequired } from '@artibox/slate-core';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { VIDEO_TYPE } from './video.constants';
import Video, { VideoProps } from './video.component';
import { VideoCommands } from './video.commands';
import { VideoRenderer } from './video.renderer';
import { VideoSchema } from './video.schema';

export interface VideoPluginConfig {
  type?: string;
  component?: RendererBaseComponent<VideoProps>;
}

export interface VideoPlugin extends VideoRenderer, PickPluginAndRequired<'schema'> {
  commands: VideoCommands;
}

export function VideoPlugin(config?: VideoPluginConfig): VideoPlugin {
  const type = config?.type ?? VIDEO_TYPE;
  const component = config?.component ?? Video;
  const commands = VideoCommands(type);
  const renderer = VideoRenderer({ type, component });
  const schema = VideoSchema(type);

  return {
    commands,
    ...renderer,
    schema
  };
}
