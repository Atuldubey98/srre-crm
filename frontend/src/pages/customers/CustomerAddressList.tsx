import "./CustomerAddressList.css";
import { Address } from "./interfaces";
export type CustomerAddressListProps = {
  address: Address[];
};
export default function CustomerAddressList(props: CustomerAddressListProps) {
  return (
    <section className="customer__addressList">
      <h4>Addresses</h4>
      <ul>
        {props.address.map((address) => (
          <li key={address._id}>
            <fieldset>{address.location}</fieldset>
          </li>
        ))}
      </ul>
    </section>
  );
}
