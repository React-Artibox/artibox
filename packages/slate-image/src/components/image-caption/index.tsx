import React, { CSSProperties, forwardRef } from 'react';
import cx from 'classnames';
import { useLocale } from '@artibox/components/locale';
import { ImageCaptionPropsForRenderer } from '../../typings';
import '../../styles';

const placeholderStyle: CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: 0,
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  verticalAlign: 'text-top'
};

const ImageCaption = forwardRef<HTMLImageElement, ImageCaptionPropsForRenderer>(function ImageCaption(props, ref) {
  const { children, isEmpty, ...rest } = props;
  const locale = useLocale();
  const placeholder = locale.editor.image.captionInputPlaceholder;

  return (
    <figcaption
      ref={ref}
      className={cx('artibox-slate-image__caption', {
        'artibox-slate-image__caption--empty': isEmpty
      })}
      {...rest}
    >
      {isEmpty && (
        <span className="artibox-slate-image__caption-placeholder" contentEditable={false} style={placeholderStyle}>
          {placeholder}
        </span>
      )}
      {children}
    </figcaption>
  );
});

export default ImageCaption;
