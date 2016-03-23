import { command } from './command';

export const generate = command({
  name: 'generate <something>',
  handler: (something, program) => {
    // ...
  },
  options: [
    {
      value: '-p, --peppers',
      description: 'Add peppers',
    },
  ],
});
