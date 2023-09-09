import { ButtonHTMLAttributes, memo } from "react";
import "./Button.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children?: React.ReactNode;
}
function ButtonElement(props: ButtonProps) {
  const { label, children, ...buttonProps } = props;
  return (
    <button {...buttonProps}>
      {children} {label}
    </button>
  );
}
const Button = memo(ButtonElement);
export default Button;
