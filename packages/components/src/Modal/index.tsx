import React, {
  FC,
  MouseEventHandler,
  EventHandler,
  MouseEvent,
  KeyboardEvent,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import Portal, { PortalProps } from '../Portal';
import './styles';

export interface ModalProps {
  className?: string;
  maskClassName?: string;
  /**
   * classNames props of CSSTransition in react-transition-group.
   */
  transitionClassNames?: string | CSSTransitionClassNames;
  getContainer?: PortalProps['getContainer'];
  open: boolean;
  title?: string;
  maskDelay?: number;
  maskClosable?: boolean;
  onClose?: EventHandler<MouseEvent | KeyboardEvent>;
  onConfirm?: MouseEventHandler;
  onCancel?: MouseEventHandler;
}

const defaultTransitionClassNames: CSSTransitionClassNames = {
  enter: 'artibox-modal__fade--enter',
  enterActive: 'artibox-modal__fade--enter-active',
  exit: 'artibox-modal__fade--exit',
  exitActive: 'artibox-modal__fade--exit-active'
};

const Modal: FC<ModalProps> = ({
  children,
  className,
  maskClassName,
  transitionClassNames = defaultTransitionClassNames,
  getContainer,
  open,
  maskDelay = 300,
  maskClosable = false,
  onClose,
  onConfirm,
  onCancel,
  title
}) => {
  const maskRef = useRef<HTMLDivElement>(null);
  const onMaskClick = useCallback<MouseEventHandler>(
    event => {
      const mask = maskRef.current;
      if (event.target === mask && maskClosable && onClose) {
        onClose(event);
      }
    },
    [maskClosable, onClose]
  );

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    function handler(event: KeyboardEvent) {
      if (event.key === 'Escape' && onClose) {
        onClose(event);
      }
    }

    document.addEventListener('keyup', handler as any);
    return () => {
      document.removeEventListener('keyup', handler as any);
    };
  }, [open, onClose]);

  return (
    <Portal getContainer={getContainer}>
      <CSSTransition in={open} classNames={transitionClassNames} timeout={maskDelay} unmountOnExit={true}>
        <div
          ref={maskRef}
          className={cx('artibox-modal__mask', maskClassName)}
          onClick={onMaskClick}
          onKeyPress={undefined}
          role="dialog"
          tabIndex={-1}
        >
          <div className={cx('artibox-modal', className)}>
            <header className="artibox-modal__header">
              <div className="artibox-modal__title">{title}</div>
              <button onClick={onClose}>X</button>
            </header>
            <main className="artibox-modal__body">{children}</main>
            <footer className="artibox-modal__footer">
              <button onClick={onCancel}>cancel</button>
              <button onClick={onConfirm}>confirm</button>
            </footer>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
