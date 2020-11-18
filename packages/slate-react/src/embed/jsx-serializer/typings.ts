import { EmbedElement } from '@artibox/slate-common/embed/common';
import { JsxSerializeElementProps } from '../../jsx-serializer';
import { WithEmbedRenderData } from '../_internal/renderer/typings';

export interface JsxSerializeEmbedElementProps<EmbedData extends Record<string, unknown>, RenderData>
  extends JsxSerializeElementProps<EmbedElement & EmbedData>,
    WithEmbedRenderData<RenderData> {}
