<h1 align="center">@artibox/components</h1>

<div align="center">

[![npm package](https://img.shields.io/npm/v/@artibox/components.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/components)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/components.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/components)

</div>

## Installation

```bash
npm install @artibox/components --save

or

$ yarn add @artibox/components
```

## Introduction

This package is an `UI library for artibox` just like [material-ui](https://material-ui.com), [antd](https://ant.design/), ...etc.  
Also includes `locale` and `theme` for artibox.

## API

### Components

```ts
import { Icon, Tooltip } from '@artibox/components';

or;

import Icon from '@artibox/components/Icon';
import Tooltip from '@artibox/components/Tooltip';
```

Currently we just implement:

- [Icon](./src/Icon/index.tsx)
- [Modal](./src/Modal/index.tsx) - Semi finished.
- [Portal](./src/Portal/index.tsx)
- [Tooltip](./src/Tooltip/index.tsx) - Without some placements.

### Theme

The value of theme context is just theme name since we use css variables to apply theme.

- [ThemeContext](./src/theme.tsx#L15) - Provide resolved props and theme.
- [ThemeProvider](./src/theme.tsx#L18)
- [addThemeNamePrefix](./src/theme.tsx#L22)
- [resolveThemeObjectToCSSProperties](./src/theme.tsx#26)

### Locale

Provide the locale object from [@artibox/locale](../locale/README.md).

- [LocaleContext](./src/locale.tsx#L5)
- [LocaleProvider](./src/locale.tsx#L12)
- [useLocale](./src/locale.tsx#L16)

### Utils

- [composeEventHandlers](./src/utils/compose-event-handlers.ts)
- [composeRefs](./src/utils/compose-refs.ts)
- [convertCamelToKebab](./src/utils/convert-camel-to-kebab.ts)
