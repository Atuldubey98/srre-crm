import { ChangeEventHandler, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../common/Input";

export default function FilterCustomers() {
  const [search, setSearch] = useState("");
  let timeOut: number | undefined = undefined;
  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
    clearTimeout(timeOut);
  };
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (search === "") {
      navigate(location.pathname);
    } else {
      timeOut = setTimeout(() => {
        navigate(location.pathname + `?q=${search}`);
      }, 500);
    }
  }, [search]);
  return (
    <section className="customer__filter">
      <Input
        type="search"
        aria-label="Search"
        onChange={onChangeSearch}
        name="search"
        value={search}
      />
    </section>
  );
}
