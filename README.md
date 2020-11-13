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

| Elements                                                  |                                                                       |
| :-------------------------------------------------------- | :-------------------------------------------------------------------- |
| [Paragraph](./?path=/story/elements-paragraph--example)   | Enables support for paragraphs.                                       |
| [Blockquote](./?path=/story/elements-blockquote--example) | Enables support for block quotes.                                     |
| [Embed](./?path=/story/elements-embed--example)           | Enables support for embeddable media such as YouTube or Vimeo videos. |
| [Divider](./?path=/story/elements-divider--example)       | Enables support for dividers.                                         |
| [Heading](./?path=/story/elements-heading--example)       | Enables support for headings (from 1 to 6).                           |
| [Image](./?path=/story/elements-image--example)           | Enables support for images.                                           |
| [Link](./?path=/story/elements-link--example)             | Enables support for hyperlinks.                                       |
| [List](./?path=/story/elements-list--example)             | Enables support for bulleted, numbered lists.                         |
| [ReadMore](./?path=/story/elements-readmore--example)     | Enables support for read more dividers. Commonly used in CMS.         |

| Marks                                                        |                                               |
| :----------------------------------------------------------- | :-------------------------------------------- |
| [Bold](./?path=/story/marks-bold--example)                   | Enables support for bold formatting.          |
| [Highlight](./?path=/story/marks-highlight--example)         | Enables support for highlights.               |
| [Italic](./?path=/story/marks-italic--example)               | Enables support for italic formatting.        |
| [Strikethrough](./?path=/story/marks-strikethrough--example) | Enables support for strikethrough formatting. |
| [Underline](./?path=/story/marks-underline--example)         | Enables support for underline formatting.     |

| Handlers                                        |                                                     |
| :---------------------------------------------- | :-------------------------------------------------- |
| [Break](./?path=/story/handlers-break--example) | Enables support for inserting exit and soft breaks. |

| Widgets                                                      |                                           |
| :----------------------------------------------------------- | :---------------------------------------- |
| [FileUploader](./?path=/story/widgets-fileuploader--example) | Enables support for uploading files.      |
| [InputBlock](./?path=/story/widgets-inputblock--example)     | Enables support for inputting processing. |
| [Toolbar](./?path=/story/widgets-toolbar--example)           | Provides a toolbar with tools.            |

| Serializers                                              |                                        |
| :------------------------------------------------------- | :------------------------------------- |
| [JsxSerializer](./?path=/story/serializers-jsx--example) | Provides serializer for rendering jsx. |

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
