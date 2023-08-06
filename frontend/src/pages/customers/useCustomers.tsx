import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import useQuery from "../../common/useQuery";
import { getAllCustomers, getCustomerById } from "./customersApi";
import { Customer, PlainCustomer } from "./interfaces";

export default function useCustomers() {
  const [customers, setCustomers] = useState<PlainCustomer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { customerId } = useParams();
  const pathnameMatch = useMatch(location.pathname);
  const showNewCustomerPage = pathnameMatch?.pathnameBase === "/customers/new";
  const showEditCustomerPage =
    pathnameMatch?.pathnameBase === `/customers/${customerId}/edit`;
  const query = useQuery();
  const search = query.get("q") || "";
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getAllCustomers(search);
        setCustomers(data.data);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.response?.data.message);
        }
      } finally {
        setLoading(false);
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
        const response = await getCustomerById(customerId);
        setCustomer(response.data.data);
      } catch (error) {}
    })();
  }, [customerId]);
  const onSetCustomer = (updateedCustomer: Customer) => {
    setCustomer(updateedCustomer);
  };
  return {
    customers,
    loading,
    onSetCustomer,
    error,
    customer,
    showNewCustomerPage,
    showEditCustomerPage,
  };
}
