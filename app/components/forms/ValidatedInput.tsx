/**
 * @see https://github.com/airjp73/remix-validated-form
 */
import { FormInput } from "./FormInput";
import { useField } from "remix-validated-form";

export type ValidatedFormInputProps = {
  name: string;
  label: string;
  required?: boolean;
  // All other props
  [x: string]: any;
};

export const ValidatedFormInput = ({
  name,
  label,
  required = false,
  ...rest
}: ValidatedFormInputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <FormInput
      name={name}
      label={label}
      error={error}
      required={required}
      inputProps={getInputProps({ id: name, ...rest })}
    />
  );
};
