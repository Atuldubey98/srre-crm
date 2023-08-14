import React from "react";
import { User } from "../pages/login/interfaces";

export const AuthContext = React.createContext<{
  currentUser: User | null;
  onSetCurrentUser: (user: User) => void;
  currentUserLoading: boolean;
} | null>(null);


