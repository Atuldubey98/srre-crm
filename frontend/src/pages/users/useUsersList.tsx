import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { MessageBodyProps } from "../../common/MessageBody";
import { Employee } from "../login/interfaces";
import { getUsersList } from "./usersApi";

export default function useUsersList() {
  const [usersList, setUsersList] = useState<Employee[] | null>(null);
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  function addToUsersList(employeeUser: Employee) {
    setUsersList((prev) => [...(prev || []), employeeUser]);
  }
  function removeUserFromList(employeeId: string) {
    setUsersList((prev) => (prev || []).filter((e) => e._id !== employeeId));
  }
  const operations = { addToUsersList, removeUserFromList };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUsersList();
        setUsersList(data.data);
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
      }
    })();
  }, []);
  return { messageBody, usersList, operations };
}
