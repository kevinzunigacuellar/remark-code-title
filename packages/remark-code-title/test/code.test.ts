import { test, expect } from "vitest";
import plugin from "../src/index";
import { remark } from "remark";

test("adds a div containing the title before a code node", async () => {
  const md = `
  # Some title
  
  \`\`\`js title="hello.js"
    console.log("hello world");
  \`\`\`
  
  Some block of text
    `.trim();
  const processor = remark().use(plugin);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div class="remark-code-title">hello.js</div>`
  );
});

test("adds a div containing the title before a code node inside a blockquote", async () => {
  const md = `
  # Some code in a blockquote

  ># My cool code
  >
  >\`\`\`js title="hello.js"
  >  console.log("hello world");
  >\`\`\`
  
  Some block of text
    `.trim();
  const processor = remark().use(plugin);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div class="remark-code-title">hello.js</div>`
  );
});

test("adds a div containing the title before a code node when its the first item", async () => {
  const md = `
  \`\`\`js title="hello.js"
    console.log("hello world");
  \`\`\`
  
  Some block of text
    `.trim();
  const processor = remark().use(plugin);
  const result = await processor.process(md);
  expect(result.toString()).toContain(
    `<div class="remark-code-title">hello.js</div>`
  );
});
