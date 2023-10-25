import { test, expect } from "vitest";
import codeTitle from "../src/index";
import { remark } from "remark";
import html from "remark-html";

test("adds a title before a code node", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
});

test("adds a title before a code node inside a blockquote parent node", async () => {
  const title = "star.js";
  const md = `
  # Some code in a blockquote

  ># My cool code
  >
  >\`\`\`js title="${title}"
  >console.log("hello world");
  >\`\`\`

  Some block of text
  `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
});

test("adds a title before a code node when code block does not have a language", async () => {
  const title = "foo.js";
  const md = `
  \`\`\`title="${title}"
  console.log("hello world");
  \`\`\`

  Some block of text
  `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
});

test("adds a title before a code node that does not have a language with a two word name", async () => {
  const title = "Cool title";
  const md = `
  \`\`\`title="${title}"
  console.log("hello world");
  \`\`\`

  Some block of text
  `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
});

test("tests html execution", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const processor = remark().use(codeTitle).use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  expect(result.toString()).toContain("<div data-remark-code-title");
  expect(result.toString()).not.toContain(
    '<div class="data-remark-code-title"'
  );
});

test("tests html execution using custom element", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const baseName = "custom-base-element";

  const processor = remark()
    .use(codeTitle, { baseName: baseName })
    .use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  expect(result.toString()).toContain(`<div ${baseName}`);
  // expect(result.toString()).not.toContain('<div data-remark-code-title');
});

test("tests html execution using an additional class as string", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const baseName = "custom-base-element";
  const additionalClasses = "add-cls-1";

  const processor = remark()
    .use(codeTitle, {
      baseName: baseName,
      additionalClasses: additionalClasses,
    })
    .use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  // expect(result.toString()).toContain('<div data-remark-code-title');
  expect(result.toString()).toContain(
    `<div ${baseName} class="${additionalClasses}"`
  );
});

test("tests html execution using an additional class as string array", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const baseName = "custom-base-element";
  const additionalClasses = ["add-cls-1", "add-cls-2"];

  const processor = remark()
    .use(codeTitle, {
      baseName: baseName,
      additionalClasses: additionalClasses,
    })
    .use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  // expect(result.toString()).toContain('<div data-remark-code-title');
  expect(result.toString()).toContain(
    `<div ${baseName} class="${additionalClasses.join(" ")}"`
  );
});
test("tests html execution using class instead of attribute", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const baseName = "custom-base-element";

  const processor = remark()
    .use(codeTitle, { useClassInsteadOfAttribute: true, baseName: baseName })
    .use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  expect(result.toString()).not.toContain("<div data-remark-code-title");
  expect(result.toString()).toContain(`<div class="${baseName}"`);
});

test("tests html execution using class instead of attribute with an additional class as string", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const baseName = "custom-base-element";
  const additionalClasses = "add-cls";

  const processor = remark()
    .use(codeTitle, {
      useClassInsteadOfAttribute: true,
      baseName: baseName,
      additionalClasses: additionalClasses,
    })
    .use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  expect(result.toString()).not.toContain("<div data-remark-code-title");
  expect(result.toString()).toContain(
    `<div class="${baseName} ${additionalClasses}"`
  );
});

test("tests html execution using class instead of attribute with an additional class as string array", async () => {
  const title = "random.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
  `.trim();

  const baseName = "custom-base-element";
  const additionalClasses = ["add-cls-1"];

  const processor = remark()
    .use(codeTitle, {
      useClassInsteadOfAttribute: true,
      baseName: baseName,
      additionalClasses: additionalClasses,
    })
    .use(html, { sanitize: false });

  const result = await processor.process(md);
  expect(result.toString()).toContain(title);
  expect(result.toString()).not.toContain("<div data-remark-code-title");
  expect(result.toString()).toContain(
    `<div class="${baseName} ${additionalClasses}"`
  );
});
