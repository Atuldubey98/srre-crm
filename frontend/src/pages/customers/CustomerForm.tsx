import { ChangeEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AboutSection } from "../../common/PageLeftRight";
import CustomerAddressForm from "./CustomerAddressForm";
import "./CustomerForm.css";
import CustomerNameContactForm from "./CustomerNameContactForm";
import { getCustomerById } from "./customersApi";
import { Address } from "./interfaces";
export type CustomerNameContact = {
  _id?: string;
  name: string;
  contactName: string;
  contactPhoneNumber: string;
};
export default function CustomerForm() {
  const { customerId } = useParams();
  const [customerNameContact, setCustomerNameContact] =
    useState<CustomerNameContact | null>(null);
  const onSetCustomerNameContact = (value: CustomerNameContact) => {
    setCustomerNameContact(value);
  };
  const [customerAddressList, setCustomerAddressList] = useState<Address[]>([]);
  const onAddCustomerAddress = (address: Address) => {
    setCustomerAddressList(
      customerAddressList.find((add) => add._id === address._id)
        ? customerAddressList.map((add) =>
            add._id === address._id ? address : add
          )
        : [...customerAddressList, address]
    );
  };
  const removeCustomerAddress = (addressId: string) => {
    setCustomerAddressList(
      customerAddressList.filter((add) => add._id !== addressId)
    );
  };
  const [formAdress, setFormAddress] = useState<Address | null>(null);
  const onChangeFormAddress: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormAddress(
      formAdress
        ? { ...formAdress, location: e.currentTarget.value }
        : { location: "", _id: "" }
    );
  };
  const onSetFormAddress = (value: Address | null) => {
    setFormAddress(value);
  };
  const onChangeCustomerContact: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (customerNameContact) {
      setCustomerNameContact({
        ...customerNameContact,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    } else {
      setCustomerNameContact({
        name: "",
        contactName: "",
        contactPhoneNumber: "",
      });
    }
  };
  useEffect(() => {
    if (!customerId) {
      setCustomerNameContact({
        name: "",
        contactName: "",
        contactPhoneNumber: "",
      });
      setCustomerAddressList([]);
      return;
    }
    (async () => {
      try {
        const { data } = await getCustomerById(customerId);
        setCustomerNameContact({
          _id: data.data._id,
          name: data.data.name,
          contactName: data.data.contact ? data.data.contact.name || "" : "",
          contactPhoneNumber: data.data.contact
            ? data.data.contact.phoneNumber || ""
            : "",
        });
        setCustomerAddressList(data.data.address);
      } catch (error) {}
    })();
  }, [customerId]);
  return (
    <AboutSection>
      <section className="customer__formSection">
        <CustomerNameContactForm
          onSetCustomerNameContact={onSetCustomerNameContact}
          onChangeCustomerContact={onChangeCustomerContact}
          customerNameContact={customerNameContact}
        />
        {customerNameContact?._id ? (
          <CustomerAddressForm
            removeCustomerAddress={removeCustomerAddress}
            onAddCustomerAddress={onAddCustomerAddress}
            customerId={customerNameContact._id}
            onSetFormAddress={onSetFormAddress}
            formAddress={formAdress}
            onChangeFormAddress={onChangeFormAddress}
          />
        ) : null}
        <ul className="address__list address__listForm">
          {customerAddressList.map((address) => (
            <li onClick={() => setFormAddress(address)} key={address._id}>
              <fieldset>
                <address>{address.location}</address>
              </fieldset>
            </li>
          ))}
        </ul>
      </section>
    </AboutSection>
  );
}
