import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { MessageBodyProps } from "../../common/MessageBody";
import useQuery from "../../common/useQuery";
import { getAllCustomers } from "./customersApi";
import { PlainCustomer } from "./interfaces";
import useHasMore from "../reports/useHasMore";

export default function useCustomers() {
  const [customers, setCustomers] = useState<PlainCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    hasMore,
    queryParams,
    onSetHasMoreReports,
    onIncrementSkip,
    onSetSkip,
  } = useHasMore();
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
    onSetSkip(0);
    setCustomers([]);
  }, [search]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getAllCustomers(search, queryParams.skip);
        setCustomers((prev) => {
          return [...prev, ...data.data];
        });
        onSetHasMoreReports(data.data.length >= queryParams.limit);
      } catch (error) {
        setMessage({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Network error occured",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [search, queryParams.skip]);
  const onCustomerAdd = (customer: PlainCustomer) => {
    if (customers) {
      setCustomers([...customers, customer]);
    }
  };
  return {
    customers,
    message,
    onCustomerAdd,
    hasMore,
    loading,
    onIncrementSkip,
    showNewCustomerPage,
    showEditCustomerPage,
  };
}
