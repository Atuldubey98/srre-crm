import { ChangeEventHandler, useDeferredValue, useMemo, useState } from "react";
import "./CustomerAddressList.css";
import { Address } from "./interfaces";
import Input from "../../common/Input";
export type CustomerAddressListProps = {
  address: Address[];
};
export default function CustomerAddressList(props: CustomerAddressListProps) {
  const [query, setQuery] = useState<string>("");
  const onChangeQuery: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };
  const search = useDeferredValue(query);
  const addressList = useMemo(() => {
    return props.address.filter((add) =>
      search
        ? add.location
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
        : true
    );
  }, [search]);
  return (
    <section className="customer__addressList">
      <h4>Addresses</h4>
      <div className="customer__AddressSearch">
        <Input
          type="search"
          value={search}
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
