import { Select } from "antd";
import type { SelectProps } from "antd";

interface CommonSelectProps extends SelectProps {
  options: SelectProps["options"];
}

export default function CommonSelect({ options, ...props }: CommonSelectProps) {
  return (
    <Select
      {...props}
      options={options}
      className={`w-full ${props.className ?? ""}`}
    />
  );
}
