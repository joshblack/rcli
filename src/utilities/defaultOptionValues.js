export const defaultOptionValues = (defaultValues) =>
  (option) => option.value !== true
    ? option.value
    : defaultValues[option.name];

