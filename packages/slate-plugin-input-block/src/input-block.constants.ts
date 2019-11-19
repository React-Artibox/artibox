export const INPUT_BLOCK_TYPE = 'input_block' as const;
export type INPUT_BLOCK_TYPE = typeof INPUT_BLOCK_TYPE;

export const INPUT_BLOCK_DATA_KEY_ON_CONFIRM = 'onConfirm' as const;
export type INPUT_BLOCK_DATA_KEY_ON_CONFIRM = typeof INPUT_BLOCK_DATA_KEY_ON_CONFIRM;

export const INPUT_BLOCK_QUERY_CURRENT_BLOCK = 'Query[Input Block] Current Block' as const;
export type INPUT_BLOCK_QUERY_CURRENT_BLOCK = typeof INPUT_BLOCK_QUERY_CURRENT_BLOCK;
export const INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK = 'Query[Input Block] Is Selection In Input Block' as const;
export type INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK = typeof INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK;

export const INPUT_BLOCK_COMMAND_START = 'Command[Input Block] Start' as const;
export type INPUT_BLOCK_COMMAND_START = typeof INPUT_BLOCK_COMMAND_START;
export const INPUT_BLOCK_COMMAND_END = 'Command[Input Block] End' as const;
export type INPUT_BLOCK_COMMAND_END = typeof INPUT_BLOCK_COMMAND_END;
