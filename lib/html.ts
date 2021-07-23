export function html(strings: TemplateStringsArray, ...variables: any[]){
    return strings.reduce((acc,cur,i)=>`${acc}${cur}${i in variables ? variables[i]  : '' }`, '')
}