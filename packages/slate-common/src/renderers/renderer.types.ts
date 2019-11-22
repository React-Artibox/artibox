import { RenderAttributes } from 'slate-react';
import { ReactHTML, ComponentType } from 'react';

export type RendererBaseComponent<P extends RenderAttributes = RenderAttributes> = keyof ReactHTML | ComponentType<P>;
