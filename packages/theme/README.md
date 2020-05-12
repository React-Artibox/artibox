<h1 align="center">@artibox/theme</h1>

<div align="center">

[![npm package](https://img.shields.io/npm/v/@artibox/theme.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/theme)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/theme.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/theme)

</div>

## Installation

```bash
npm install @artibox/theme --save

or

$ yarn add @artibox/theme
```

## Introduction

We use `css variables` to theming.

### Prebuilt themes

- [artibox]
- [artibox-dark]

#### From css file

```ts
import '@artibox/theme/prebuilts/artibox.css';
```

or

```css
@import '~@artibox/theme/prebuilts/artibox.css';
```

Then you can just pass theme name to editor.

```tsx
<ArtiboxEditor
  // ...
  theme="artibox"
/>
```

#### From object

```tsx
import { THEME_ARTIBOX } from '@artibox/theme/artibox';

<ArtiboxEditor
  // ...
  theme={THEME_ARTIBOX}
/>;
```

### Define a custom theme.

When you want more customization than a prebuilt theme offers, you can:

#### Use sass mixin

Create your own theme file. A custom theme file does two things:

1.Imports the `artibox-theme` sass mixin from register.

2.Defines a palette structure as below.

A typical theme file will look something like this:

```scss
@import '~@artibox/theming/register';

$your-theme-palette: (
  primary-light: ...,
  primary: ...,
  primary-dark: ...,
  background: ...,
  surface: ...,
  text: ...,
  border: ...,
  divider: ...,
  placeholder: ...,
  icon: ...
);

/**
 * Register theme to the theme name.
 */
@include artibox-theme('your-theme-name', $your-theme-palette);
```

You only need this single sass file; you do not need to use sass to style the rest of your app.

You can also use any existing sass tooling to build the file (such as gulp-sass or grunt-sass). The simplest approach is to use the node-sass CLI; you simply run:

```bash
node-sass src/path/to/your/theme.scss dist/path/to/your/theme.css
```

#### Use js object

Please see the interface of [`ThemeObject`](./src/typings.ts#1).

```ts
import { ThemeObject } from '@artibox/theme';

const YOUR_CUSTOMER_THEME: ThemeObject = {
  // ...
};
```

Then you can pass it into editor as mentioned above.

### Theming your own components for editor and serializers

Since we use css variables to theming, the above theme will be built into:

```css
.artibox-theme-your-theme-name {
  --artibox-primary-light: ...;
  --artibox-primary: ...;
  --artibox-primary-dark: ...;

  /* ... */
  --artibox-background: ...;
  --artibox-surface: ...;
  --artibox-text: ...;

  /* ... */
}
```

If you have a blockquote in editor and you want to use your onw `Blockquote` instead of the `<blockquote>` tag from HTML. You can do something like this:

```scss
.your-custom-blockquote {
  padding-left: 10px;
  margin-left: 0;
  border-left: 3px solid var(--artibox-primary);
}
```

```tsx
const YourCustomBlockquote: FC = ({ children, ...props }) => (
  <div className="your-custom-blockquote" {...props}>
    {children}
  </div>
);
```

You can use your own theme instead of using theme system of artibox:

```scss
.your-editor {
  .your-custom-blockquote {
    padding-left: 10px;
    margin-left: 0;
    border-left: 3px solid var(--whatever);
  }
}
```

```tsx
<ArtiboxEditor className="your-editor" />
```

And the component can be used in both editor and jsx-serializer.
