import { test, expect } from "vitest";
import codeTitle from "../src/index";
import { remark } from "remark";

test("adds a title before a code node", async () => {
  const title = "hello.js";
  const md = `
  # Some title
  
  \`\`\`js title="${title}"
  console.log("hello world");
  \`\`\`
  
  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(`\n${title}\n`);
});

test("adds a title before a code node inside a parent node", async () => {
  const title = "hello.js";
  const md = `
  # Some code in a blockquote

  ># My cool code
  >
  >\`\`\`js title="${title}"
  >  console.log("hello world");
  >\`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(`> ${title}\n`);
});

test("adds a title before a code node when code block does not have a language", async () => {
  const title = "hello.js";
  const md = `
  \`\`\`title="${title}"
    console.log("hello world");
  \`\`\`

  Some block of text
    `.trim();
  const processor = remark().use(codeTitle);
  const result = await processor.process(md);
  expect(result.toString()).toContain(`${title}\n`);
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
  expect(result.toString()).toContain(`${title}\n`);
});
