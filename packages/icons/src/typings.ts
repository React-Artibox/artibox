import { SVGProps } from 'react';

export interface IconDefinition {
  name: string;
  definition: {
    svg?: SVGProps<SVGSVGElement>;
    path?: SVGProps<SVGPathElement>;
  };
}
