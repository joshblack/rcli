import invariant from 'fbjs/lib/invariant';

const registerOption = (program, option) => {
  const { value, description, pattern, defaultValue } = option;

  invariant(
    value,
    'Each option needs a value specified.',
  );

  const order = [value, description, pattern, defaultValue];
  const optionValues = order.filter((value) => value);

  program.option(...optionValues);
};

export const command = ({
  name,
  handler,
  options,
}) => ({
  register: (program) => {
    if (options) {
      options.forEach((option) => {
        registerOption(program, option);
      });
    }

    program
      .command(name)
      .action(handler.bind(program));
  },
});
