import invariant from 'fbjs/lib/invariant';

export const requiredOptions = (options) => (givenOptions) => {
  const missingOptions = [];

  Object.keys(givenOptions).forEach((option) => {
    const isRequired = options[option];

    if (isRequired && typeof givenOptions[option] === 'undefined') {
      missingOptions.push(option);
    }
  });

  invariant(
    missingOptions.length === 0,
    'Missing options for the `generate` command, expected the following to ' +
    'be set: [%s].',
    missingOptions,
  );
};
