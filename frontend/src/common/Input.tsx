import { InputHTMLAttributes } from "react";
import './Input.css'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Input(props: InputProps) {
  return <input {...props} className="input__field" />;
}
