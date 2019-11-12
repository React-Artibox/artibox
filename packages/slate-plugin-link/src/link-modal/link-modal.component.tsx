import { Editor } from 'slate';
import React, { memo, useCallback, useState, useLayoutEffect } from 'react';
import { Modal } from '@artibox/components';
import { getQuery, getCommand } from '@artibox/slate-core';
import { LinkModalSetOpen } from './link-modal.contexts';
import { LINK_QUERY_URL, LINK_COMMAND_SET } from '../link.constants';
import { LinkQueryUrl } from '../link.queries';
import { LinkCommandSet } from '../link.commands';

export interface LinkModalProps {
  editor: Editor;
  open: boolean;
  setOpen: LinkModalSetOpen;
}

/**
 * @todo
 * Provide i18n.
 */
function LinkModal({ open, setOpen, editor }: LinkModalProps) {
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const { isExpanded } = editor.value.selection;
  const onConfirm = () => {
    const command = getCommand<LinkCommandSet>(editor, LINK_COMMAND_SET);

    if (url) {
      command(url, isExpanded ? undefined : text);
    }

    onClose();
  };

  useLayoutEffect(() => {
    if (open) {
      setUrl(getQuery<LinkQueryUrl>(editor, LINK_QUERY_URL)() ?? '');
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
