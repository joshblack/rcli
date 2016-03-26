export const reactStatelessTemplate = (componentName, includeStyles) => {
  const imports = ['import React from \'react\';'];

  if (includeStyles) {
    imports.push(`import styles from './${componentName}';`);
  }

  const componentTemplate = `const ${componentName} = () => (

);`;

  const template = [
    ...imports,
    '',
    componentTemplate,
    '',
    `export default ${componentName};`,
  ];

  return template.join('\n');
}
