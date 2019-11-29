import React, { memo } from 'react';
import { clsPrefix } from './constants';

function Divider() {
  return <span className={`${clsPrefix}__divider`} />;
}

export default memo(Divider, () => true);
