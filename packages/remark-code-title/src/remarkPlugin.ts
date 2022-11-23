import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";
import chalk from "chalk";

export const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
  return (tree) => {
    {
      visit(tree, "code", (node, index, parent) => {
        
        if (!node.meta) return;
        const [title] = node.meta.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? "";
        if (!title) {
          if (/\stitle/.test(node.meta))
            console.warn(
              `${chalk.blue(
                "[remark-code-title]"
              )} Could not parse your title correctly, try following this format title="index.js"`
            );
          return;
        }

        const titleNode: mdast.HTML = {
          type: "html",
          value: `<div class="remark-code-title">${title}</div>`,
        };
        parent?.children.splice(index as number, 0, titleNode);
        return (index as number) + 2;
      });
    }
  }
};
