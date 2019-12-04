<h1 align="center">@artibox/locale</h1>

<div align="center">

[![npm package](https://img.shields.io/npm/v/@artibox/locale.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/locale)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/locale.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/locale)

</div>

## Installation

```bash
npm install @artibox/locale --save

or

$ yarn add @artibox/locale
```

## Introduction

This package just only includes `all locale for artibox` and the interface `LocaleDefinition`.

## Usage

### Definition

Please see the [definition](./src/typings.ts) first.  
All locales are restricted in this definition and each locale is just an object.

### Import

Please import each locale since there is no root file.

```ts
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
```
