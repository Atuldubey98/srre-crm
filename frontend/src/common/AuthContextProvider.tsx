import React, { useEffect, useState } from "react";
import { User } from "../pages/login/interfaces";
import { currentUserApi } from "../pages/login/loginApi";
import { AuthContext } from "./AuthContext";


export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserLoading, setCurrentUserLoading] = useState<boolean>(true);
  const onSetCurrentUser = (user: User) => {
    setCurrentUser(user);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await currentUserApi();
        onSetCurrentUser(data.data);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setCurrentUserLoading(false);
      }
    })();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        onSetCurrentUser,
        currentUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
