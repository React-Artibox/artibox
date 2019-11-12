import React, { ReactNode, useState } from 'react';
import { LinkModalSetOpen, LinkModalSetOpenContext } from './link-modal.contexts';

export interface LinkModalProviderProps {
  children: (open: boolean, setOpen: LinkModalSetOpen) => ReactNode;
}

function LinkModalProvider({ children }: LinkModalProviderProps) {
  const [open, setOpen] = useState(false);

  return <LinkModalSetOpenContext.Provider value={setOpen}>{children(open, setOpen)}</LinkModalSetOpenContext.Provider>;
}

export default LinkModalProvider;
