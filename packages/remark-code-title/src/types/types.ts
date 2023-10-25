export type Options = {
  /**
   * name to use for the attribute or class
   *  (depending on the `useClassInsteadOfAttribute` flag)
   */
  baseName?: string | null | undefined;

  /**
   * Put the identifier in the "class="baseName" instead of using it
   *  as an attribute.
   */
  useClassInsteadOfAttribute?: boolean | null | undefined;

  /**
   * Utilize custom additional classes
   *  (this can be useful for example for tailwind.css)
   *
   * Include both string[] and string  types to prevent users from
   *  having to debug typescript errors if they type
   * `additionalClasses: "class"`
   *  instead of
   * `additionalClasses: ["class"]`
   */
  additionalClasses?: string | string[] | null | undefined;
};
