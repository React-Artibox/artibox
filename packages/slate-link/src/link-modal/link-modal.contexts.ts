import { Dispatch, SetStateAction, createContext } from 'react';

export type LinkModalSetOpen = Dispatch<SetStateAction<boolean>>;
export const LinkModalSetOpenContext = createContext<LinkModalSetOpen>(() => {});
export type LinkModalSetOpenContext = typeof LinkModalSetOpenContext;
