import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";

export const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
  return (tree, file) => {
    visit(tree, "code", (node, index, parent) => {
      if (!node.meta) return;

      const [title] = node.meta.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? "";

      if (!title) {
        if (node.meta.includes("title=")) {
          file.message("Invalid title", node, "remark-code-title");
        }
        return;
      }

      const titleNode: mdast.HTML = {
        type: "html",
        value: `<div data-remark-code-title>${title}</div>`,
      };

      if (parent && parent.children && typeof index === "number") {
        parent.children.splice(index, 0, titleNode);
        return index + 2;
      }
    });
  };
};
