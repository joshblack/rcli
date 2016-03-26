export const jestTestTemplate = (componentName) => {
  const imports = [
    'import React from \'react\';',
    `import ${componentName} from '../${componentName}';`,
  ];

  const testTemplate = `describe('${componentName}', () => {
  it('should work', () => {
    // ...
  });
});
`;

  const template = [
    ...imports,
    '',
    testTemplate,
  ];

  return template.join('\n');
};
