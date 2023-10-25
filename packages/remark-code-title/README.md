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
import html from "remark-html";
import { read } from "to-vfile";
import { remark } from "remark";

const processor = remark().use(codeTitle).use(html, { sanitize: false });
const markdown = await read("example.md");
const result = await processor.process(markdown);
```

Running `node example.js` yields:

```html
<h1>Example</h1>
<div data-remark-code-title data-language="js">example.js</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

### Additional options

It is possible to pass parameters to the `codeTitle` plugin.

**Note that** all options can be used at the same time, in any combination, without producing unexpected results.

The parameter structure has the following type:

```ts
export type Options = {
  baseName?: string | null | undefined;

  useClassInsteadOfAttribute?: boolean | null | undefined;

  additionalClasses?: string | string[] | null | undefined;
};
```

In particular, `useClassInsteadOfAttribute=true` will generate the following HTML, from the previous example:

```html
<h1>Example</h1>
<div class="data-remark-code-title" data-language="js">example.js</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

`baseName="some-other-attribute"` Will generate the following HTML:

```html
<h1>Example</h1>
<div some-other-attribute data-language="js">example.js</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

And finally, `additionalClasses="additional-class"` or `additionalClasses=["additional-class"]`, will generate

```html
<h1>Example</h1>
<div data-remark-code-title class="additional-class" data-language="js">
  example.js
</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```

Note that if an array of multiple strings is provided, like `additionalClasses=["additional-class1", "additional-class2"]`, the result is

```html
<h1>Example</h1>
<div
  data-remark-code-title
  class="additional-class1 additional-class2"
  data-language="js"
>
  example.js
</div>
<pre>
  <code>console.log("Hello World");</code>
</pre>
```
