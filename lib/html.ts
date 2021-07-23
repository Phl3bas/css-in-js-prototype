export function html(
  strings: TemplateStringsArray,
  ...variables: any[]
): DocumentFragment {
  return document
    .createRange()
    .createContextualFragment(
      strings.reduce(
        (acc, cur, i) => `${acc}${cur}${i in variables ? variables[i] : ""}`,
        ""
      )
    );
}
