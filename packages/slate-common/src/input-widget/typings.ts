import { LocaleDefinition } from '@artibox/locale';

/**
 * The minimum configuration of input for link, embed, ...etc.
 */
export type InputWidgetConfig = {
  getPlaceholder: (locale: LocaleDefinition) => string;
  confirm: (value: string) => void;
};

export type SetInputWidgetConfig = (value: InputWidgetConfig | null) => void;
