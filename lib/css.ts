import CSStree from "css-tree";
import { attachStyles } from "./attachStyles";

export type BaseExtensibleObject = {
  [key: string]: any;
};

export type InlineFunction<Props> = (
  executionContext: BaseExtensibleObject & Props
) => BaseExtensibleObject | string | number;

export type Interpolation<Props extends Object = BaseExtensibleObject> =
  | InlineFunction<Props>
  | BaseExtensibleObject
  | string
  | Interpolation<Props>[];

const cache = new WeakMap();

export function css<T extends BaseExtensibleObject>(
  stringParts: TemplateStringsArray,
  ...variables: Interpolation<T>[]
) {
  return (props?: T): { classes: BaseExtensibleObject } => {
    const cssResult = stringParts.reduce((acc, cur, index) => {
      return `${acc}${cur}${
        index in variables ? (variables[index] as InlineFunction<T>)(props) : ""
      }`;
    }, "");

    const [classes, cssString] = parseStyles(cssResult);
    console.log(classes);
    attachStyles(cssString);

    return { classes };
  };
}

function parseStyles(cssString: string): [BaseExtensibleObject, string] {
  const ast = CSStree.parse(cssString);

  const shortLifeCache = {};

  CSStree.walk(ast, (node) => {
    let name;

    if (node.type === "ClassSelector") {
      if (Object.keys(shortLifeCache).includes(node.name)) {
        name = shortLifeCache[node.name];
      } else {
        name =
          node.name +
          "-" +
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 8);
      }

      shortLifeCache[node.name] = name;
      node.name = name;
    }
  });

  return [shortLifeCache, CSStree.generate(ast)];
}
