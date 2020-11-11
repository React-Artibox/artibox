# Artibox

A complete rich text editor.  
Currently based on [Slate](https://github.com/ianstormtaylor/slate) framework.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-common.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-common)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-common.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-common)
[![Licence](https://img.shields.io/github/license/React-Artibox/artibox.svg?maxAge=60)](https://github.com/React-Artibox/artibox/blob/master/LICENSE)

[Try out our plugins](./?path=/story/examples-playgroud--all).

## Documentation

- [Getting Started](./?path=/story/docs-getting-started--page)
- [Theme](./?path=/story/docs-theme--page)
- [Locale](./?path=/story/docs-locale--page)
- [Icons](./?path=/story/docs-icons--page)

## Features

| Elements         |                                                                       |
| :--------------- | :-------------------------------------------------------------------- |
| [Blockquote](./) | Enables support for block quotes.                                     |
| [Embed](./)      | Enables support for embeddable media such as YouTube or Vimeo videos. |
| [Divider](./)    | Enables support for dividers.                                         |
| [Heading](./)    | Enables support for headings (from 1 to 6).                           |
| [Image](./)      | Enables support for images.                                           |
| [Link](./)       | Enables support for hyperlinks.                                       |
| [List](./)       | Enables support for bulleted, numbered lists.                         |
| [Paragraph](./)  | Enables support for paragraphs.                                       |
| [ReadMore](./)   | Enables support for read more dividers. Commonly used in CMS.         |

| Marks                                                        |                                               |
| :----------------------------------------------------------- | :-------------------------------------------- |
| [Bold](./?path=/story/marks-bold--example)                   | Enables support for bold formatting.          |
| [Highlight](./?path=/story/marks-highlight--example)         | Enables support for highlights.               |
| [Italic](./?path=/story/marks-italic--example)               | Enables support for italic formatting.        |
| [Strikethrough](./?path=/story/marks-strikethrough--example) | Enables support for strikethrough formatting. |
| [Underline](./?path=/story/marks-underline--example)         | Enables support for underline formatting.     |

| Handlers    |                                                     |
| :---------- | :-------------------------------------------------- |
| [Break](./) | Enables support for inserting exit and soft breaks. |

| Widgets            |                                                                       |
| :----------------- | :-------------------------------------------------------------------- |
| [FileUploader](./) | Enables support for embeddable media such as YouTube or Vimeo videos. |
| [InputBlock](./)   | Provides a toolbar with buttons.                                      |
| [Toolbar](./)      | Provides a toolbar with buttons.                                      |

| Serializers         |                                                                             |
| :------------------ | :-------------------------------------------------------------------------- |
| [JsxSerializer](./) | Enables support for deserializing content from HTML format to Slate format. |

## Development scripts

Useful scripts include:

```bash
yarn
```

> Installs package dependencies

```bash
yarn build
```

> Build the local packages.

```bash
yarn storybook:start
```

> Starts storybook dev (after building).

```bash
yarn lint
```

> Lint ts/js files w/ [eslint](https://eslint.org/) and scss files w/ [stylelint](https://stylelint.io/).

```bash
yarn test
```

> Test w/ [jest](https://jestjs.io/).

```bash
yarn release
```

> Using lerna to bump package versions, build and publish to npm via [conventional changelog](https://github.com/conventional-changelog).
