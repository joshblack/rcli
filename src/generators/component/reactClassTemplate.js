export const reactClassTemplate = (componentName, includeStyles) => {
  const imports = ['import React from \'react\';'];

  if (includeStyles) {
    imports.push(`import styles from './${componentName}.css';`);
  }

  const componentTemplate = `export default class ${componentName} extends React.Component {
  render() {
    return (

    );
  }
}`;

  const template = [
    ...imports,
    '',
    componentTemplate,
    ''
  ];

  return template.join('\n');
};
