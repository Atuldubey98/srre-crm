import Input from "../../common/Input";
import "./CustomerAddressList.css";
import { Address } from "./interfaces";
import useSearchAddress from "./useSearchAddress";
export type CustomerAddressListProps = {
  address: Address[];
};
export default function CustomerAddressList(props: CustomerAddressListProps) {
  const { query, onChangeQuery, addressList } = useSearchAddress(props.address);
  return (
    <section className="customer__addressList">
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
      <ul className="address__list">
        {addressList.map((address) => (
          <li key={address._id}>
            <fieldset>{address.location}</fieldset>
          </li>
        ))}
      </ul>
    </section>
  );
}
