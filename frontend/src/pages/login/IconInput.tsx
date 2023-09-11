import { IconType } from "react-icons";
import Input, { InputProps } from "../../common/Input";
import "./IconInput.css";
export type IconInputProps = {
  inputProps: InputProps;
  Icon: IconType;
};
export default function IconInput(props: IconInputProps) {
  const { Icon, inputProps } = props;
  return (
    <div className="icon__input d-flex-center">
      <Icon size={25} />
      <Input {...inputProps} />
    </div>
  );
}
