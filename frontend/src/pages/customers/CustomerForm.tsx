import { useLocation, useMatch } from "react-router-dom";
import MessageBody from "../../common/MessageBody";
import { EditSection } from "../../common/PageLeftRight";
import CustomerContactInputs from "./CustomerContactInputs";
import "./CustomerForm.css";
import CustomerFormUpdateSaveBtn from "./CustomerFormUpdateSaveBtn";

import CustomerAddressListInputs from "./CustomerAddressListInputs";
import CustomerNameField from "./CustomerNameField";
import useSingleCustomer from "./useSingleCustomer";

export default function CustomerForm() {
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const isCustomerNewForm = pathnameMatch?.pathnameBase === `/customers/new`;
  const {
    customer,
    onCustomerFormSubmit,
    onChangeName,
    onChangeAddress,
    onChangeContact,
    messageBody,
    onAddAddress,
    onRemoveAddress,
  } = useSingleCustomer();

  const isUpdateForm =
    pathnameMatch?.pathnameBase === `/customers/${customer?._id}/edit`;
  return customer && (isUpdateForm || isCustomerNewForm) ? (
    <EditSection>
      <form onSubmit={onCustomerFormSubmit} className="customer__form">
        <CustomerNameField name={customer.name} onChangeName={onChangeName} />
        <CustomerAddressListInputs
          addressInputProps={{
            address: customer.address,
            onAddAddress: onAddAddress,
            onChangeAddress,
            onRemoveAddress,
          }}
        />
        <CustomerContactInputs
          onChangeContact={onChangeContact}
          contact={customer.contact}
        />
        <CustomerFormUpdateSaveBtn customerId={customer._id} />
        <MessageBody {...messageBody} />
      </form>
    </EditSection>
  ) : null;
}
