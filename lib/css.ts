
import CSStree from 'css-tree'
import { createGlobalStyles } from './createGlobalStyles';




export type BaseExtensibleObject = {
    [key: string]: any;
  };

export type InlineFunction<Props> = (
    executionContext: BaseExtensibleObject & Props
) => BaseExtensibleObject | string | number


export type Interpolation<Props extends Object = BaseExtensibleObject> =
  | InlineFunction<Props>
  | BaseExtensibleObject
  | string
  | Interpolation<Props>[];


  export type ClassNameType = typeof intialClassNames[number]
  
  const cache = new WeakMap()
  const intialClassNames = []
  const hashedClassNames ={}
  

export function css<T extends BaseExtensibleObject>(
    stringParts: TemplateStringsArray,
    ...variables: Interpolation<T>[]
  ) {
    return (props?:T): {classes: BaseExtensibleObject} => {
        
      const cssResult =  stringParts.reduce((acc, cur, index) => {
        return `${acc}${cur}${index in variables ? (variables[index] as InlineFunction<T>)(props) : ""}`;
      }, "");

      const [classes, cssString] = parseStyles(cssResult)

      createGlobalStyles(cssString)

      return {classes}
    };
  }





function parseStyles(cssString: string): [BaseExtensibleObject, string]{
    const ast = CSStree.parse(cssString);



    CSStree.walk(ast, (node)=>{
        if(node.type === "ClassSelector") {
            const newName = node.name + "-" +  Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 8)


            intialClassNames.push(node.name)
            hashedClassNames[node.name] = newName
            node.name = newName
        }

      
    })

    return [hashedClassNames, CSStree.generate(ast)]

}

