import "./PageLeftRight.css";
export type CommonProps = {
  children?: React.ReactNode;
};
export function PageLeftRight(props: CommonProps) {
  return <div className="page__leftRight">{props.children}</div>;
}
export function ListSection(props: CommonProps) {
  return <section className="list__section">{props.children}</section>;
}
export function AboutSection(props: CommonProps) {
  return <section className="about__section">{props.children}</section>;
}

export function EditSection(props: CommonProps) {
  return <section className="edit__section">{props.children}</section>;
}
