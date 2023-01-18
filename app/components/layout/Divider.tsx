import clsx from "clsx";

export type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  return <div className={clsx("my-5 border-b border-border", className)} />;
};
