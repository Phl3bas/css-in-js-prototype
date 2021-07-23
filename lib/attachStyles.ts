export function attachStyles(css: string): void {
  let styleSheet = document.querySelector(
    "[data-css-in-js]"
  ) as HTMLStyleElement;

  if (!styleSheet) {
    styleSheet = document.createElement("style");

    styleSheet.setAttribute("data-css-in-js", "");
    document.querySelector("head")?.appendChild(styleSheet);
  }

  styleSheet.appendChild(document.createTextNode(css.trim()));
}
