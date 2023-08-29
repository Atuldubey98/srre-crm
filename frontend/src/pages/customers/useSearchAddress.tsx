import { useState, useDeferredValue, ChangeEventHandler, useMemo } from "react";
import { Address } from "./interfaces";

export default function useSearchAddress(address: Address[]) {
  const [query, setQuery] = useState<string>("");
  const deferedSearch = useDeferredValue(query);
  const onChangeQuery: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.currentTarget.value);
  };
  const addressList = useMemo(() => {
    return address.filter((add) =>
      deferedSearch
        ? add.location
            .toLocaleLowerCase()
            .indexOf(deferedSearch.toLocaleLowerCase()) !== -1
        : true
    );
  }, [deferedSearch]);
  return { onChangeQuery, addressList, query };
}
