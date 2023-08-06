import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import './LinkButton.css'
export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  to: string;
}
export default function LinkButton(props: LinkButtonProps) {
  const { label, ...anchorProps } = props;
  return (
    <Link {...anchorProps} className="link__btn">
      {label}
    </Link>
  );
}
