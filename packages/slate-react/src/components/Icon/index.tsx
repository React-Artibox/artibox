import React, { SVGProps, forwardRef } from 'react';
import { IconDefinition } from '@artibox/icons';

const svgBaseProps: SVGProps<SVGSVGElement> = {
  width: '1em',
  height: '1em',
  ['aria-hidden']: true,
  focusable: false
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * The `IconDefinition` will be rendered.
   */
  icon: IconDefinition;
  /**
   * Provide `fontSize` by `em` to control size of icon.
   * @default 1
   */
  size?: number;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({ children, style, icon, size = 1, ...props }, ref) => {
  if (!icon) {
    throw new Error('The icon definition is needed.');
  }

  const { definition } = icon;
  const svgProps: SVGProps<SVGSVGElement> = {
    ...svgBaseProps,
    ...definition.svg,
    ...props,
    style: { ...style, fontSize: `${size}em` }
  };

  return (
    <svg {...svgProps} ref={ref}>
      <path {...definition.path} />
    </svg>
  );
});

export default Icon;
