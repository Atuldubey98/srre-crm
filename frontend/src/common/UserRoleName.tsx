import { useAuth } from "./useAuth";
import { GrUserAdmin, GrUser } from "react-icons/gr";
import "./UserRoleName.css";
export default function UserRoleName() {
  const authContext = useAuth();

  return (
    <div className="user__roleName d-flex-center">
      {authContext?.currentUser?.role === "EMPLOYEE" ? (
        <GrUser size={20} />
      ) : (
        <GrUserAdmin size={20}/>
      )}
      <span className="user__role">
        {authContext?.currentUser?.name} | {authContext?.currentUser?.role}
      </span>
    </div>
  );
}
