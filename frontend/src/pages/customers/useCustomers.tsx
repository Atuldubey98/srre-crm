import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { MessageBodyProps } from "../../common/MessageBody";
import useQuery from "../../common/useQuery";
import { getAllCustomers, getCustomerById } from "./customersApi";
import { Customer, PlainCustomer } from "./interfaces";

export default function useCustomers() {
  const [customers, setCustomers] = useState<PlainCustomer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerLoading, setCustomerLoading] = useState<boolean>(false);
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
  useEffect(() => {
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
        setMessage({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
      } finally {
        setCustomerLoading(false);
      }
    })();
  }, [customerId]);
  const onSetCustomer = (updateedCustomer: Customer) => {
    setCustomer(updateedCustomer);
  };
  return {
    customers,
    onSetCustomer,
    message,
    customerLoading,
    customer,
    showNewCustomerPage,
    showEditCustomerPage,
  };
}
