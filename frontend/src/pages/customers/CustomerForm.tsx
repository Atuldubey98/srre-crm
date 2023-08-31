import {
  ChangeEventHandler,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Input from "../../common/Input";
import { AboutSection } from "../../common/PageLeftRight";
import CustomerAddressForm from "./CustomerAddressForm";
import "./CustomerForm.css";
import CustomerNameContactForm from "./CustomerNameContactForm";
import { getCustomerById } from "./customersApi";
import { Address, PlainCustomer } from "./interfaces";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import CustomerNotFound from "./CustomerNotFound";
export type CustomerNameContact = {
  _id?: string;
  name: string;
  contactName: string;
  contactPhoneNumber: string;
};
export type CustomerFormProps = {
  onCustomerAdd: (customer: PlainCustomer) => void;
};
export default function CustomerForm(props: CustomerFormProps) {
  const { customerId } = useParams();
  const [customerNameContact, setCustomerNameContact] =
    useState<CustomerNameContact | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onSetCustomerNameContact = (value: CustomerNameContact) => {
    setCustomerNameContact(value);
  };
  const [customerAddressList, setCustomerAddressList] = useState<
    Address[] | null
  >([]);
  const onAddCustomerAddress = (address: Address) => {
    if (customerAddressList) {
      setCustomerAddressList(
        customerAddressList.find((add) => add._id === address._id)
          ? customerAddressList.map((add) =>
              add._id === address._id ? address : add
            )
          : [...customerAddressList, address]
      );
    }
  };
  const removeCustomerAddress = (addressId: string) => {
    if (customerAddressList) {
      setCustomerAddressList(
        customerAddressList.filter((add) => add._id !== addressId)
      );
    }
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
        setLoading(true);
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
      } catch (error) {
        setCustomerNameContact(null);
        setCustomerAddressList([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [customerId]);
  const [query, setQuery] = useState<string>("");
  const onChangeQuery: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };

  const deferedSearch = useDeferredValue(query);

  return (
    <AboutSection>
      {loading ? (
        <LoadingIndicatorAbout loading={loading} />
      ) : customerNameContact ? (
        <section className="customer__formSection">
          <CustomerNameContactForm
            onCustomerAdd={props.onCustomerAdd}
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
          {customerAddressList && customerAddressList.length > 0 ? (
            <div className="customer__addressList">
              <h4>Addresses</h4>
              <div className="customer__AddressSearch">
                <Input
                  id="searchAddressInList"
                  type="search"
                  value={query}
                  onChange={onChangeQuery}
                  placeholder="Search address"
                />
              </div>
              <ul className="address__list address__listForm">
                {customerAddressList
                  .filter((add) =>
                    deferedSearch
                      ? add.location.indexOf(deferedSearch) !== -1
                      : true
                  )
                  .map((address) => (
                    <li
                      onClick={() => setFormAddress(address)}
                      key={address._id}
                    >
                      <fieldset>
                        <address>{address.location}</address>
                      </fieldset>
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : (
        <CustomerNotFound />
      )}
    </AboutSection>
  );
}
