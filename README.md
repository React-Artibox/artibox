# Artibox

A complete rich text editor.  
Currently based on [Slate](https://github.com/ianstormtaylor/slate) framework.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-editor.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-editor)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-editor.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-editor)
[![Licence](https://img.shields.io/github/license/React-Artibox/artibox.svg?maxAge=60)](https://github.com/React-Artibox/artibox/blob/master/LICENSE)

[Try out our plugins](https://react-artibox.github.io/artibox/?path=/story/examples-playgroud--all).

## Documentation

- [Getting Started](https://react-artibox.github.io/artibox/?path=/story/docs-getting-started--page)
- [Theme](https://react-artibox.github.io/artibox/?path=/story/docs-theme--page)
- [Locale](https://react-artibox.github.io/artibox/?path=/story/docs-locale--page)
- [Icons](https://react-artibox.github.io/artibox/?path=/story/docs-icons--page)

## Features

| Elements                                              |                                                                       |
| :---------------------------------------------------- | :-------------------------------------------------------------------- |
| [Blockquote](https://react-artibox.github.io/artibox) | Enables support for block quotes.                                     |
| [Embed](https://react-artibox.github.io/artibox)      | Enables support for embeddable media such as YouTube or Vimeo videos. |
| [Divider](https://react-artibox.github.io/artibox)    | Enables support for dividers.                                         |
| [Heading](https://react-artibox.github.io/artibox)    | Enables support for headings (from 1 to 6).                           |
| [Image](https://react-artibox.github.io/artibox)      | Enables support for images.                                           |
| [Link](https://react-artibox.github.io/artibox)       | Enables support for hyperlinks.                                       |
| [List](https://react-artibox.github.io/artibox)       | Enables support for bulleted, numbered lists.                         |
| [Paragraph](https://react-artibox.github.io/artibox)  | Enables support for paragraphs.                                       |
| [ReadMore](https://react-artibox.github.io/artibox)   | Enables support for read more dividers. Commonly used in CMS.         |

| Marks                                                    |                                               |
| :------------------------------------------------------- | :-------------------------------------------- |
| [Bold](https://react-artibox.github.io/artibox)          | Enables support for bold formatting.          |
| [Highlight](https://react-artibox.github.io/artibox)     | Enables support for highlights.               |
| [Italic](https://react-artibox.github.io/artibox)        | Enables support for italic formatting.        |
| [Strikethrough](https://react-artibox.github.io/artibox) | Enables support for strikethrough formatting. |
| [Underline](https://react-artibox.github.io/artibox)     | Enables support for underline formatting.     |

| Handlers                                         |                                                     |
| :----------------------------------------------- | :-------------------------------------------------- |
| [Break](https://react-artibox.github.io/artibox) | Enables support for inserting exit and soft breaks. |

| Widgets                                                 |                                                                       |
| :------------------------------------------------------ | :-------------------------------------------------------------------- |
| [FileUploader](https://react-artibox.github.io/artibox) | Enables support for embeddable media such as YouTube or Vimeo videos. |
| [InputBlock](https://react-artibox.github.io/artibox)   | Provides a toolbar with buttons.                                      |
| [Toolbar](https://react-artibox.github.io/artibox)      | Provides a toolbar with buttons.                                      |

| Serializers                                              |                                                                             |
| :------------------------------------------------------- | :-------------------------------------------------------------------------- |
| [JsxSerializer](https://react-artibox.github.io/artibox) | Enables support for deserializing content from HTML format to Slate format. |

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
