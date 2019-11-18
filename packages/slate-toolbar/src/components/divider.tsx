import React, { memo } from 'react';

function Divider() {
  return <span className="artibox-toolbar__divider" />;
}

export default memo(Divider, () => true);
