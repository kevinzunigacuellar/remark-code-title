import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";

export const remarkCodeTitle: unified.Plugin<[], mdast.Root> = () => {
  return (tree, file) => {
    visit(tree, "code", (node, index, parent) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString) return;
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? "";

      if (!title) {
        if (metaString.includes("title=")) {
          file.message("Invalid title", node, "remark-code-title");
        }
        return;
      }
      /* 
        In the HTML output, the title will be rendered as a <div> tag.
       */
      const titleNode : mdast.Paragraph = {
        type: 'paragraph',
        data: {hName: 'div', hProperties: {'data-remark-code-title': true, 'data-language': node.lang}},
        children: [{type: 'text', value: title}]
      };

      if (parent && parent.children && typeof index === "number") {
        parent.children.splice(index, 0, titleNode);
        /* index + 1 causes an infinite loop 
        because a node is inserted but not removed  */
        return index + 2;
      }
    });
  };
};
