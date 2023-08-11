import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { EditSection } from "../../common/PageLeftRight";
import AddressInputs from "./AddressInputs";
import CustomerContactInputs from "./CustomerContactInputs";
import "./CustomerForm.css";
import CustomerFormUpdateSaveBtn from "./CustomerFormUpdateSaveBtn";
import { addNewCustomer, updateCustomerById } from "./customersApi";
import { Customer } from "./interfaces";
import { isAxiosError } from "axios";
export type CustomerFormProps = {
  customer?: Customer | null;
  onSetCustomer: (updatedCustomer: Customer) => void;
};
export default function CustomerForm(props: CustomerFormProps) {
  const navigate = useNavigate();
  const pathnameMatch = useMatch(location.pathname);
  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/customers/${props.customer?._id}/edit`;
  const isCustomerNewForm = pathnameMatch?.pathnameBase === `/customers/new`;
  const [message, setMessage] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const defaultCustomer: Customer = {
    _id: "",
    address: [],
    createdAt: "",
    contact: {
      name: "",
      phoneNumber: "",
    },
    name: "",
    updatedAt: "",
  };
  const [customer, setCustomer] = useState<Customer>(
    props.customer || defaultCustomer
  );

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCustomer({
      ...customer,
      name: e.currentTarget.value,
    });
  };
  const onAddAddress = () => {
    setCustomer({
      ...customer,
      address: [
        ...(customer.address || []),
        { location: "", _id: Math.random().toString(36).substring(2, 9) },
      ],
    });
  };
  const onRemoveAddress = (addressId: string) => {
    setCustomer({
      ...customer,
      address: (customer.address || []).filter((add) => add._id !== addressId),
    });
  };
  const onChangeAddress = (e: any, _id: string) => {
    setCustomer({
      ...customer,
      address: customer.address.map((add) =>
        add._id === _id ? { ...add, location: e.currentTarget.value } : add
      ),
    });
  };
  const onChangeContact: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCustomer({
      ...customer,
      contact: customer.contact
        ? { ...customer.contact, [e.currentTarget.name]: e.currentTarget.value }
        : { name: "", phoneNumber: "" },
    });
  };
  const onCustomerUpdateClick = async () => {
    try {
      const { data } = await updateCustomerById(customer._id, {
        name: customer.name,
        address: customer.address,
        contact: customer.contact,
      });
      props.onSetCustomer(data.data);
      navigate(`/customers/${customer._id}`);
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Error occured",
      });
    }
  };
  const onCustomerAddClick = async () => {
    try {
      const { data } = await addNewCustomer({
        name: customer.name,
        address: customer.address,
        contact: customer.contact,
      });
      navigate(`/customers/${data.data._id}`);
    } catch (error) {
      setMessage({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Error occured",
      });
    }
  };
  const onCustomerFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isUpdateForm) {
      await onCustomerUpdateClick();
    } else {
      await onCustomerAddClick();
    }
  };
  return (
    <EditSection>
      {(isUpdateForm && customer) || isCustomerNewForm ? (
        <form onSubmit={onCustomerFormSubmit} className="customer__form">
          <div className="form__control">
            <label htmlFor="name">Customer Name :</label>
            <Input
              type="text"
              onChange={onChangeName}
              name="name"
              value={customer.name}
            />
          </div>
          <AddressInputs
            address={customer.address}
            onAddAddress={onAddAddress}
            onRemoveAddress={onRemoveAddress}
            onChangeAddress={onChangeAddress}
          />
          <CustomerContactInputs
            onChangeContact={onChangeContact}
            contact={customer.contact}
          />
          <CustomerFormUpdateSaveBtn customerId={customer._id} />
          <MessageBody {...message} />
        </form>
      ) : null}
    </EditSection>
  );
}
