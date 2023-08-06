import React from "react";
import Header from "./Header";
type ContainerProps = {
  children?: React.ReactNode;
};
export default function Container(props: ContainerProps) {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
