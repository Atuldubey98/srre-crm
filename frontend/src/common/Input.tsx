import { InputHTMLAttributes } from "react";
import './Input.css'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Input(props: InputProps) {
  return <input {...props} className="input__field" />;
}
