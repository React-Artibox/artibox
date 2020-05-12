export interface ThemeObject {
  primaryLight: string;
  primary: string;
  primaryDark: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  divider: string;
  placeholder: string;
  icon: string;
}

export type Theme = string | ThemeObject;
