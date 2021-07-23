export function createGlobalStyles(css: string): void {
    let styleSheet = document.querySelector(
      "[data-css-in-js]"
    ) as HTMLStyleElement;
  
    if (!styleSheet) {
      styleSheet = document.createElement("style");
  
      styleSheet.setAttribute(
        "data-css-in-js",
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 8)
      );
      document.querySelector("head")?.appendChild(styleSheet);
    }

    styleSheet.appendChild(document.createTextNode(css.trim()))
}