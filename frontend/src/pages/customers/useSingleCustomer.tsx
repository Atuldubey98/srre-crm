import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { MessageBodyProps } from "../../common/MessageBody";
import { getCustomerById } from "./customersApi";
import { Customer } from "./interfaces";

export default function useSingleCustomer() {
  const location = useLocation();
  const { customerId } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/customers/${customerId}/edit`;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerLoading, setCustomerLoading] = useState<boolean>(false);
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  useEffect(() => {
    setMessageBody({ type: "success", body: "" });
    if (!customerId) {
      setCustomer(null);
      return;
    }
    (async () => {
      try {
        setCustomerLoading(true);
        const response = await getCustomerById(customerId);
        setCustomer(response.data.data);
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
        setCustomer(null);
      } finally {
        setCustomerLoading(false);
      }
    })();
  }, [customerId, isUpdateForm]);
  return {
    customer,
    customerLoading,
    messageBody,
  };
}
