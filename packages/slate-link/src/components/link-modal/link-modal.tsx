import React, { memo, useCallback, useState, useLayoutEffect } from 'react';
import { Modal } from '@artibox/components';
import { WithEditor } from '@artibox/slate-common';
import { LinkModalSetOpen } from './contexts';
import { LinkController } from '../../controller';

export interface LinkModalProps extends WithEditor {
  controller: LinkController;
  open: boolean;
  setOpen: LinkModalSetOpen;
}

/**
 * @todo
 * Provide i18n.
 */
function LinkModal({ open, setOpen, controller, editor }: LinkModalProps) {
  const onClose = useCallback(() => {
    setOpen(false);
    editor.focus();
  }, [setOpen, editor]);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const { isExpanded } = editor.value.selection;
  const onConfirm = () => {
    onClose();

    if (url) {
      controller.set(editor, url, isExpanded ? undefined : text);
    }
  };

  useLayoutEffect(() => {
    if (open) {
      setUrl(controller.getUrlOfCurrentFirst(editor) ?? '');
      setText(isExpanded ? editor.value.fragment.text : '');
    }
  }, [open]);

  return (
    <Modal title="Link" open={open} maskClosable onClose={onClose} onCancel={onClose} onConfirm={onConfirm}>
      Url:
      <input value={url} onChange={event => setUrl(event.target.value)} placeholder="https://" />
      {!isExpanded && (
        <>
          Text:
          <input value={text} onChange={event => setText(event.target.value)} />
        </>
      )}
    </Modal>
  );
}

/**
 * Avoid from re-rendered if the modal is closed.
 */
export default memo(LinkModal, (prev, next) => prev.open === next.open && !prev.open);
