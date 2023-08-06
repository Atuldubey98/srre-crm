import { SelectHTMLAttributes } from "react";
import "./SelectOptions.css";
export interface SelectOptionsProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}
export default function SelectOptions(props: SelectOptionsProps) {
  return (
    <select className="select__control" {...props}>
      {props.children}
    </select>
  );
}
