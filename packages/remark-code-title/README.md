# remark-code-title

<img alt="preview badge" src="https://img.shields.io/npm/dm/remark-code-title?color=informational&logo=npm">

Remark plugin to add a title to code blocks.

Inspired by:

- [gatsby-remark-code-titles](https://github.com/DSchau/gatsby-remark-code-titles)
- [remark-code-titles](https://github.com/mottox2/remark-code-titles) [currently not maintained]

## Demos

| Astro                                                                                                                                                        | Next.js                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ ![ Open in StackBlitz ](https://developer.stackblitz.com/img/open_in_stackblitz.svg) ](https://stackblitz.com/edit/astro-remark-code-title?file=README.md) | [ ![ Open in StackBlitz ](https://developer.stackblitz.com/img/open_in_stackblitz.svg) ](https://stackblitz.com/edit/github-sf5q11?file=README.md) |

## Installation

```bash
npm install remark-code-title
```

## Usage

Given this markdown file `example.md`:

````markdown
# Example

```js title="example.js"
console.log("Hello World");
```
````

And this script, `example.js`, using `remark-code-title`:

```js
import codeTitle from "remark-code-title";
import { read } from "to-vfile";
import { remark } from "remark";

const processor = remark().use(codeTitle);
const markdown = await read("example.md");
const result = await processor.process(markdown);
```

Running `node example.js` yields:

````markdown
# Example

example.js

```js title="example.js"
console.log("Hello World");
```
````
