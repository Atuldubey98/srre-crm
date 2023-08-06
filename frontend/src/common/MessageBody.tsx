import "./MessageBody.css";
export interface MessageBodyProps {
  type: "error" | "success";
  body: string;
}
export default function MessageBody(props: MessageBodyProps) {
  const messageClassname =
    props.type === "error"
      ? "message__body message__error"
      : "message__body message__success";
  return props.body ? (
    <div className={messageClassname}>
      <span>{props.body}</span>
    </div>
  ) : null;
}
