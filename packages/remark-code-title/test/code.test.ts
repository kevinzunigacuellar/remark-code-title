import { test, expect } from "vitest";
import codeTitle from "../src/index";
import { remark } from "remark";

test("adds a div containing the title before a code node", async () => {
  const md = `
  # Some title
  
  \`\`\`js title="hello.js"
    console.log("hello world");
  \`\`\`
  
  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    '<div data-remark-code-title data-language="js">hello.js</div>'
  );
});

test("adds a div containing the title before a code node inside a parent node", async () => {
  const md = `
  # Some code in a blockquote

  ># My cool code
  >
  >\`\`\`js title="hello.js"
  >  console.log("hello world");
  >\`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div data-remark-code-title data-language="js">hello.js</div>`
  );
});

// Fixes case where index is 0 (falsey)
test("adds a div containing the title before a code node when its the first item", async () => {
  const title = "hello World";
  const md = `
  \`\`\`js title="${title}"
    console.log("hello world");
  \`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div data-remark-code-title data-language="js">${title}</div>`
  );
});

test("adds a div containing the title before a code node that does not have a language", async () => {
  const title = "hello.js"
  const md = `
  \`\`\` title="${title}"
    console.log("hello world");
  \`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div data-remark-code-title data-language="plaintext">${title}</div>`
  );
});

test("adds a div containing the title before a code node that does not have a language with a space", async () => {
  const title = "Cool title"
  const md = `
  \`\`\`title="${title}"
    console.log("hello world");
  \`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div data-remark-code-title data-language="plaintext">${title}</div>`
  );
});

test("skips a codeblock with no meta string", async () => {
  const md = `
  \`\`\`
    Some text
  \`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).not.toContain("data-remark-code-title");
});
