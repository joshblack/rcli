import invariant from 'fbjs/lib/invariant';

const registerOption = (program, option) => {
  const { value, description = '' } = option;

  invariant(
    value,
    'Each option needs a value specified.',
  );

  program.option(value, description);
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
