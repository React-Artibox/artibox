import { RenderAttributes } from 'slate-react';
import { VIDEO_PROVIDERS } from './constants';
import { VideoSourceSerializeResult } from './source-serializers';

export type VideoProvider = typeof VIDEO_PROVIDERS[number];

export type VideoProps = RenderAttributes & VideoSourceSerializeResult;
