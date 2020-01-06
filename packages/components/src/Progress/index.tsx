import React, { forwardRef } from 'react';
import cx from 'classnames';
import './styles';

export interface ProgressProps {
  className?: string;
  percentage?: number;
}

const Progress = forwardRef<HTMLSpanElement, ProgressProps>(function Progress(props, ref) {
  const { className, percentage = 0 } = props;
  const transform = `scaleX(${percentage / 100})`;
  const style = {
    transform,
    msTransform: transform
  };

  return (
    <span ref={ref} className={cx('artibox-progress', className)}>
      <span className="artibox-progress__backdrop" />
      <span className="artibox-progress__track" style={style} />
    </span>
  );
});

export default Progress;
