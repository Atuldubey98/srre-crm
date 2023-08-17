import { ButtonHTMLAttributes, memo } from "react";
import "./Button.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
function ButtonElement(props: ButtonProps) {
  const { label, ...buttonProps } = props;
  return <button {...buttonProps}>{label}</button>;
}
const Button = memo(ButtonElement);
export default Button;
