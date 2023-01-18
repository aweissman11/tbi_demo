/**
 * @see https://github.com/airjp73/remix-validated-form
 */
import { FormCheckbox } from "./FormCheckbox";
import { useField } from "remix-validated-form";

export type ValidatedFormCheckboxProps = {
  name: string;
  label: string;
  required?: boolean;
  // All other props
  [x: string]: any;
};

export const ValidatedFormCheckbox = ({
  name,
  label,
  required = false,
  ...rest
}: ValidatedFormCheckboxProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <FormCheckbox
      name={name}
      label={label}
      error={error}
      inputProps={getInputProps({ id: name, ...rest })}
    />
  );
};
