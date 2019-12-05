import { Document, Block, Inline, DocumentJSON, BlockJSON, InlineJSON } from 'slate';

type N = Document | Block | Inline;
type NJSON = DocumentJSON | BlockJSON | InlineJSON;

export function getNodeDataByKey(node: N | NJSON, key: any): any {
  return typeof (node as N).toJSON === 'function' ? (node as N).data.get(key) : (node as NJSON).data?.[key];
}
