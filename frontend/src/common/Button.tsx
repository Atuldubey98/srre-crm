import { ButtonHTMLAttributes } from "react";
import "./Button.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
export default function Button(props: ButtonProps) {
  const { label, ...buttonProps } = props;
  return <button {...buttonProps}>{label}</button>;
}
