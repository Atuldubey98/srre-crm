import { useParams } from "react-router-dom";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import "./CustomerItem.css";
import { PlainCustomer } from "./interfaces";
export default function CustomerItem(customer: PlainCustomer) {
  const { customerId } = useParams();

  const { onNavigate } = useNavigateWithQuery();

  const selectedCustomer =
    customerId === customer._id ? "selected__customer" : "";
  return (
    <li
      onClick={() => {
        onNavigate(`/customers/${customer._id}`);
      }}
      className={`customer__item cursor-pointer ${selectedCustomer}`}
      key={customer._id}
    >
      <p className="customer__name">{customer.name}</p>
      <div className="customer__meta">
        <span>
          {`${new Date(customer.createdAt || "").toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })} | `}
        </span>
        <span>Created by :{customer?.createdBy?.name}</span>
      </div>
    </li>
  );
}
