import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";

export const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
  return (tree, file) => {
    visit(tree, "code", (node, index, parent) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      /* meta string is empty */
      if (!metaString) return;

      /* when no language is specified but there is a meta string, 
         by default node.lang has the node.meta value (considering there is not spaces) 
      */

      if (node.lang && node.lang.includes("title=")) {
        node.meta = metaString;
        node.lang = "plaintext";
      }

      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? "";

      if (!title) {
        if (metaString.includes("title=")) {
          file.message("Invalid title", node, "remark-code-title");
        }
        return;
      }

      const titleNode: mdast.HTML = {
        type: "html",
        value: `<div data-remark-code-title data-language="${
          node.lang ?? "plaintext"
        }">${title}</div>`,
      };

      if (parent && parent.children && typeof index === "number") {
        parent.children.splice(index, 0, titleNode);
        return index + 2;
      }
    });
  };
};
