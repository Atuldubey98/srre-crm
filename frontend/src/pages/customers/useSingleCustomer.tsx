import { isAxiosError } from "axios";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { MessageBodyProps } from "../../common/MessageBody";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import {
  addNewCustomer,
  getCustomerById,
  updateCustomerById,
} from "./customersApi";
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
    if (!customerId) {
      setCustomer({
        _id: "",
        address: [],
        createdAt: "",
        contact: {
          name: "",
          phoneNumber: "",
        },
        name: "",
        updatedAt: "",
      });
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

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (customer) {
      setCustomer({
        ...customer,
        name: e.currentTarget.value,
      });
    }
  };
  const onAddAddress = () => {
    if (customer) {
      setCustomer({
        ...customer,
        address: [
          ...(customer.address || []),
          { location: "", _id: Math.random().toString(36).substring(2, 9) },
        ],
      });
    }
  };
  const onRemoveAddress = (addressId: string) => {
    if (customer) {
      setCustomer({
        ...customer,
        address: (customer.address || []).filter(
          (add) => add._id !== addressId
        ),
      });
    }
  };
  const onChangeAddress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    _id: string
  ) => {
    if (customer) {
      setCustomer({
        ...customer,
        address: customer.address.map((add) =>
          add._id === _id ? { ...add, location: e.currentTarget.value } : add
        ),
      });
    }
  };
  const onChangeContact: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (customer) {
      setCustomer({
        ...customer,
        contact: customer.contact
          ? {
              ...customer.contact,
              [e.currentTarget.name]: e.currentTarget.value,
            }
          : { name: "", phoneNumber: "" },
      });
    }
  };
  const { onNavigate: navigate } = useNavigateWithQuery();
  const onCustomerUpdateClick = async () => {
    if (customer) {
      try {
        const { data } = await updateCustomerById(customer._id, {
          name: customer.name,
          address: customer.address,
          contact: customer.contact,
        });
        setCustomer(data.data);
        navigate(`/customers/${customer._id}`);
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Error occured",
        });
      }
    }
  };
  const onCustomerAddClick = async () => {
    if (customer) {
      try {
        const { data } = await addNewCustomer({
          name: customer.name,
          address: customer.address,
          contact: customer.contact,
        });
        navigate(`/customers/${data.data._id}`);
      } catch (error) {
        setMessageBody({
          type: "error",
          body: isAxiosError(error)
            ? error.response?.data.message
            : "Error occured",
        });
      }
    }
  };

  const onCustomerFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    if (customer) {
      e.preventDefault();
      const errorMessage =
        customer.name.length <= 2
          ? "Customer name cannot be less than 2"
          : customer.address.length === 0
          ? "At least one address is required"
          : null;
      if (errorMessage) {
        setMessageBody({
          type: "error",
          body: errorMessage,
        });
      } else {
        if (isUpdateForm) {
          await onCustomerUpdateClick();
        } else {
          await onCustomerAddClick();
        }
      }
    }
  };
  return {
    customer,
    customerLoading,
    messageBody,
    onAddAddress,
    onChangeAddress,
    onChangeContact,
    onRemoveAddress,
    onChangeName,
    onCustomerFormSubmit,
  };
}
