import { ChangeEventHandler } from "react";
import FormLabelField from "../../common/FormLabelField";
import "./CustomerFields.css";
import CustomerNameAddressFields from "./CustomerNameAddressFields";
import { Customer, SiteContactPerson } from "./interfaces";
import { Address } from "../customers/interfaces";
export type CustomerFieldsProps = {
  onChangeCustomerField: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;
  customer: string;
  onAddressChange: (address: Address | null) => void;
  onChangeCustomerFieldItem: (customer: Customer | null) => void;
  onChangeContactField: ChangeEventHandler<HTMLInputElement>;
  siteContactPerson: SiteContactPerson;
  customerAddress: string;
};
export default function CustomerFields(props: CustomerFieldsProps) {
  const { customer, customerAddress } = props;

  return (
    <fieldset className="field__section">
      <legend>Customer</legend>
      <CustomerNameAddressFields
        onAddressChange={props.onAddressChange}
        customer={customer}
        customeAddressFieldRequired={true}
        onChangeCustomerField={props.onChangeCustomerFieldItem}
        customerAddress={customerAddress}
      />
      <FormLabelField
        input={{
          name: "identification",
          placeholder: "Contact name or id ? eg APL123",
          value: props.siteContactPerson.identification,
          onChange: props.onChangeContactField,
        }}
        label="Site Contact Person ID or Name"
      />
      <FormLabelField
        input={{
          name: "contactNumber",
          placeholder: "Contact Number of the person?",
          value: props.siteContactPerson.contactNumber,
          onChange: props.onChangeContactField,
        }}
        label="Site Contact Person Phone number"
      />
    </fieldset>
  );
}
