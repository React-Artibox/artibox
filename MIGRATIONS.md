# Migrations

# v0.2 -> v1.0 (2020-05-12)

Previously, theme prop of editor only support theme name(`string`). But we found that it's not familiar for css in js to customizing their theme.

## Name of css variables changed.

Provide meaningful names instead of neutral-[level].

- neutral-0 -> text
- neutral-4 -> icon
- neutral-5 -> placeholder
- neutral-6 -> divider
- neutral-7 -> border
- neutral-8 -> background
- neutral-9 -> surface

And remove useless levels(1 - 3).  
If you use these variables on your custom components before, just use your own theme system instead of depending on theme of artibox.

## File path of prebuilt themes changed.

Before:

```tsx
import '@artibox/theme/artibox';

<ArtiboxEditor theme="artibox" />;
```

After:

```tsx
import '@artibox/theme/prebuilts/artibox.css';

<ArtiboxEditor theme="artibox" />;

// or
import { THEME_ARTIBOX } from '@artibox/theme/artibox';

<ArtiboxEditor theme={THEME_ARTIBOX} />;
```

## Support customizing theme by object, familiar to css in js.

Please see [Readme](./packages/theme/README.md) of packages [theme](./packages/theme/README.md).
