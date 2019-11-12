import { FC } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  getContainer?: () => HTMLElement;
}

const Portal: FC<PortalProps> = ({ getContainer, children }) => {
  const container = getContainer ? getContainer() : document.body;
  return ReactDOM.createPortal(children, container);
};

export default Portal;
