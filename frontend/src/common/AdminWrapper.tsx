import { useAuth } from "./useAuth";
export type AdminWrapperProps = {
  children?: JSX.Element;
};
export default function AdminWrapper(props: AdminWrapperProps) {
  const authContext = useAuth();
  return authContext?.currentUser?.role === "ADMIN" ? props.children : null;
}
