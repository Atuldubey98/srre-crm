import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { MessageBodyProps } from "../../common/MessageBody";
import useQuery from "../../common/useQuery";
import { getAllCustomers } from "./customersApi";
import { PlainCustomer } from "./interfaces";

export default function useCustomers() {
  const [customers, setCustomers] = useState<PlainCustomer[]>([]);

  const { customerId } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const showNewCustomerPage = pathnameMatch?.pathnameBase === "/customers/new";
  const showEditCustomerPage =
    pathnameMatch?.pathnameBase === `/customers/${customerId}/edit`;
  const query = useQuery();
  const search = query.get("q") || "";
  const [message, setMessage] = useState<MessageBodyProps>({
    body: "",
    type: "success",
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCustomers(search);
        setCustomers(data.data);
      } catch (error) {
        setMessage({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
      }
    })();
  }, [customerId, search]);

  return {
    customers,
    message,
    showNewCustomerPage,
    showEditCustomerPage,
  };
}
