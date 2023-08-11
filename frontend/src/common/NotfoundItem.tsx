import { IconType } from "react-icons";
import "./NotfoundItem.css";
export type NotfoundItemProps = {
  Icon: IconType;
  message: string;
};
export default function NotfoundItem(props: NotfoundItemProps) {
  const { Icon, message } = props;
  return (
    <section className="not__foundItem d-flex-center">
      <Icon size={50} color="lightblue" />
      <h1>{message}</h1>
    </section>
  );
}
