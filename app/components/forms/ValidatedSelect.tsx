/**
 * @see https://github.com/airjp73/remix-validated-form
 */
import { FormSelect } from "./FormSelect";
import { useField } from "remix-validated-form";

export type ValidatedSelectProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

export const ValidatedSelect = ({
  name,
  label,
  options,
  required = false,
}: ValidatedSelectProps) => {
  const { error } = useField(name);

  return (
    <FormSelect
      name={name}
      label={label}
      options={options}
      error={error}
      required={required}
    />
  );
};
