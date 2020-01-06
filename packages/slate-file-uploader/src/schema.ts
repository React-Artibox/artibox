import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';

export type CreateFileUploaderSchemaConfig = NodeType;

/**
 * The file uploader is an editor util plugin, it's only support to wrap a node which is uploading.
 * So there are no any marks and there is only one block or inline in nodes.
 */
export function createFileUploaderSchema(config: CreateFileUploaderSchemaConfig): SchemaProperties {
  const { type } = config;
  return {
    blocks: {
      [type]: {
        nodes: [
          {
            match: [{ object: 'block' }, { object: 'inline' }],
            max: 1
          }
        ],
        data: {
          percentage: (percentage: number) => typeof percentage === 'number'
        },
        marks: [{ type: () => false }]
      }
    }
  };
}
