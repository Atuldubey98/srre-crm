import { IoBusinessSharp } from "react-icons/io5";
import Dashstat from "./Dashstat";
import { useNavigate } from "react-router-dom";
export type TotalCustomersProps = {
  customerCount: number;
};
function TotalCustomers(props: TotalCustomersProps) {
  const { customerCount } = props;
  const navigate = useNavigate();
  const onTotalCustomerClick = () => {
    navigate("/customers");
  };
  return (
    <Dashstat
      onClick={onTotalCustomerClick}
      iconProps={{
        size: 25,
        color: "brown",
      }}
      value={customerCount.toString()}
      Icon={IoBusinessSharp}
      label="Total Customers"
    />
  );
}

export default TotalCustomers;
