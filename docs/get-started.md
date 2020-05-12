# Get Started

1. [Installing](#installing)
2. [Adding Plugins](#adding-plugins)
3. [Adding Toolbar or Others](#adding-toolbar-or-others)
4. [Applying Locale](#applying-locale)
5. [Adding Themes](#adding-themes)
6. [Saving To a Database](#saving-to-a-database)
7. [Rendering By Using Jsx Serializer](#rendering-by-using-jsx-serializer)

## Installing

Artibox is a monorepo divided up into multiple npm packages and based on `react` and `slate`, so to install it you do:

```bash
npm install react react-dom slate slate-react @artibox/slate-editor --save

or

yarn add react react-dom slate slate-react @artibox/slate-editor
```

And then we can import and create an editor into your app.

```tsx
// ...
import { Value } from 'slate';
import { createArtiboxEditor } from '@artibox/slate-editor';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.'
          }
        ]
      }
    ]
  }
});

const ArtiboxEditor = createArtiboxEditor();

const App = () => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(change => setValue(change.value), []);

  return <ArtiboxEditor value={value} onChange={onChange} />;
};
```

## Adding Plugins

After your editor rendered, but you want to do more than just type a plaintext string. Let's just add some plugins on your editor.  
You can use [pre-built packages of artibox](../README.md#packages) or create a customize plugin of `slate-react`.

We use bold for example:

```tsx
import { createBold } from '@artibox/bold';

/**
 * Create a `Bold` module includes:
 * - some factories
 * - utils and commands of module
 */
const Bold = creatBold();

const ArtiboxEditor = createArtiboxEditor({
  plugins: [Bold.forPlugin()]
});
```

Please see the docs of [Module Factories](./module-factories.md) to learn more.

Now you can use the default hotkey of bold, <kbd>⌘</kbd>+<kbd>b</kbd> on Mac or <kbd>ctrl</kbd>+<kbd>b</kbd> on Windows, to toggle text between bold.

## Adding Toolbar or Others

Eventhough you can use hotkey to control the bold, but you want user can just click a button to control it. Let's just add a toolbar, menu, ...etc.

```tsx
import { Bold as BoldIcon } from '@artibox/icons';
import { Toolbar } from '@artibox/slate-toolbar';

const ArtiboxEditor = createArtiboxEditor({
  plugins: [
    Bold.forPlugin(),
    Toolbar.forPlugin({
      /**
       * Tools will be showed if expanded.
       */
      expandedTools: [{ icon: BoldIcon, hook: Bold.forToolHook() }]
    })
  ]
});
```

## Applying Locale

Let's delete all texts on the editor first, and then you can see the placeholder of editor. The slate editor created by `createArtiboxEditor` has built-in locale provider.  
You can just pass locale object from [@artibox/locale](../packages/locale/README.md) or object matching the [LocaleDefinition](../packages/locale/src/typings.ts#L1) to `locale` prop of editor.

```tsx
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';

// ...

<ArtiboxEditor
  // ...
  locale={enUS}
  // locale={zhTW}
/>;
```

## Adding Themes

We use css variables to theming. The `theme` prop can be either a `string` or a `object`.  
The slate editor created by `createArtiboxEditor` has built-in theme provider with theme resolver.  
You can just pass it to `theme` prop of editor.

```tsx
import { THEME_ARTIBOX } from '@artibox/theme/artibox';

<ArtiboxEditor
  // ...
  theme={THEME_ARTIBOX}
/>;

// or

import '@artibox/theme/prebuilts/artibox.css';

<ArtiboxEditor
  // ...
  theme="artibox"
/>;
```

Please see the docs of [@artibox/theme](../packages/theme/README.md) to learn more.

## Saving To a Database

It's very easy to save the value of slate to database:

- `value.toJSON()` to transform to json.
- `JSON.strigify(value)` to transform to string.

```tsx
const [value, setValue] = useState(initialValue);

const json = value.toJSON();
const jsonString = JSON.strigify(value);

JSON.strigify(value) === JSON.strigify(value.toJSON())
};
```

## Rendering By Using Jsx Serializer

If you want to render the value stored in your database as what you see in the editor. Just use [@artibox/slate-jsx-serializer](../packages/slate-jsx-serializer/README.md).  
It's a quick and easy way to reuse your custom component on both editor and anywhere you want to render the json of value.

```tsx
import { createBoldJsxSerializerRule } from '@artibox/slate-bold';

const jsxSerializer = createJsxSerializer({
  marks: [createBoldJsxSerializerRule()]
});

// ...

const jsx = jsxSerializer(valueJSON);

return <div>{jsx}</div>;
```

The default component of `Bold` is `<strong>` tag of HTML. If you want to override it, just create your custom component and then pass it to both editor and jsx-serializer:

```tsx
const YourBold = ({ children, ...props }) => (
  <span {...props} style={{ fontWeight: 'bold' }}>
    {children}
  </span>
);

// ...

const ArtiboxEditor = createArtiboxEditor({
  plugins: [Bold.forPlugin({ component: YourBold })]
});

// ...

const jsxSerializer = createJsxSerializer({
  marks: [createBoldJsxSerializerRule({ component: YourBold })]
});
```

Please see the docs of [@artibox/slate-jsx-serializer](../packages/slate-jsx-serializer/README.md) to learn more.
