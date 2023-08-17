import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../common/Input";

export default function FilterCustomers() {
  const [search, setSearch] = useState("");
  const timeOut = useRef<number | undefined | null>(null);
  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.currentTarget.value);
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
  };
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    if (search === "") {
      navigate(location.pathname);
    } else {
      timeOut.current = setTimeout(() => {
        navigate(location.pathname + `?q=${search}`);
      }, 500);
    }
  }, [search, location.pathname, navigate]);
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
