export type ListRootTypeKey = 'ol' | 'ul';
export type ListItemTypeKey = 'li';
export type ListTypeKey = ListRootTypeKey | ListItemTypeKey;
export type ListTypes = Record<ListTypeKey, string>;
