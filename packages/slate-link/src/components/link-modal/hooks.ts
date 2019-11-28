import { useContext, useCallback } from 'react';
import { LinkModalSetOpen, LinkModalSetOpenContext } from './contexts';

export function useLinkModalSetOpen(): LinkModalSetOpen {
  return useContext(LinkModalSetOpenContext);
}

export function useLinkModalOpenModal() {
  const setOpen = useLinkModalSetOpen();
  return useCallback(() => setOpen(true), [setOpen]);
}

export function useLinkModalCloseModal() {
  const setOpen = useLinkModalSetOpen();
  return useCallback(() => setOpen(false), [setOpen]);
}
