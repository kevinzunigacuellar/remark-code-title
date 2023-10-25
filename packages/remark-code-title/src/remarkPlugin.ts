import { visit } from "unist-util-visit";
import type * as mdast from "mdast";
import type * as unified from "unified";
import { Options } from "./types/types";

// Options to use in case none is given
const defaultOptions: Options = {
  // Use Attribute by default to keep backwards compatibility
  useClassInsteadOfAttribute: false,
  baseName: "data-remark-code-title",
};

function mergeOptions(
  defaults: Options,
  custom: Options | null | undefined
): Options {
  if (!custom) return defaults;

  let opts = { ...defaults, ...custom };

  return opts;
}

export const remarkCodeTitle: unified.Plugin<
  [(Options | undefined | null)?],
  mdast.Root
> = (options?: Options | undefined | null) => {
  const settings = mergeOptions(defaultOptions, options);

  const additionalClassString =
    typeof settings.additionalClasses === "string"
      ? settings.additionalClasses
      : undefined;
  const additionalClassesArray = Array.isArray(settings.additionalClasses)
    ? settings.additionalClasses.map((c) => c.trim())
    : [];

  const attrOrClass = {};

  if (!settings.useClassInsteadOfAttribute)
    attrOrClass[settings.baseName] = true;

  const classes: string[] = [
    settings.useClassInsteadOfAttribute ? settings.baseName : "",
    ...(!!additionalClassString ? [additionalClassString] : []),
    ...additionalClassesArray,
  ];

  // Prevent `class="" behaviour`
  if (classes.length > 0 && classes.join(" "))
    attrOrClass["class"] = classes.filter((c) => !!c).join(" ");

  return (tree, file) => {
    visit(tree, "code", (node, index, parent) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString) return;
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [
        "",
      ];
      if (!title && metaString.includes("title=")) {
        file.message("Invalid title", node, "remark-code-title");
        return;
      }
      if (!title) return;

      const titleNode: mdast.Paragraph = {
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: {
            ...attrOrClass,
            "data-language": node.lang,
          },
        },
        children: [{ type: "text", value: title }],
      };

      parent.children.splice(index, 0, titleNode);
      /* Skips this node (title) and the next node (code) */
      return index + 2;
    });
  };
};
