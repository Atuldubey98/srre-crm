import { isAxiosError } from "axios";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import SmallLoading from "../dashboard/SmallLoading";
import { CustomerReportByPieChart } from "./AboutCustomer";
import CustomerAddressList from "./CustomerAddressList";
import CustomerContact from "./CustomerContact";
import { deleteCustomerById } from "./customersApi";
import { Customer } from "./interfaces";

export type CustomerDetailsProps = {
  customer: Customer;
  error: MessageBodyProps;
};
export default function CustomerDetails(props: CustomerDetailsProps) {
  const { customer, error } = props;
  const navigate = useNavigate();
  const { onNavigate } = useNavigateWithQuery();
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const { customerId } = useParams();
  const [viewGraph, setViewGraph] = useState<boolean>(false);
  useEffect(() => {
    setMessageBody({ type: "success", body: "" });
    setViewGraph(false);
  }, [customerId]);
  const onToggleGraph = () => {
    setViewGraph(!viewGraph);
  };

  const onDeleteCustomer = async () => {
    try {
      if (confirm("Do you want to delete the customer ?")) {
        await deleteCustomerById(customer?._id || "");
        navigate("/customers");
      }
    } catch (error) {
      setMessageBody({
        type: "error",
        body: isAxiosError(error)
          ? error.response?.data.message
          : "Network error occured",
      });
    }
  };
  return (
    <div className="customer d-grid">
      <h1>{customer.name}</h1>
      {customer.contact ? <CustomerContact contact={customer.contact} /> : null}
      <MessageBody {...messageBody} />
      <MessageBody {...error} />

      <div className="btn-group d-flex-center">
        <Button
          label="Edit Customer"
          className="btn btn-info"
          onClick={() => {
            onNavigate(`/customers/${customer?._id}/edit`);
          }}
        />
        <Button
          label={viewGraph ? "Hide Stats" : "View Stats"}
          onClick={onToggleGraph}
          className="btn"
        />
        <Button
          label="Delete Customer"
          className="btn btn-danger"
          onClick={onDeleteCustomer}
        />
      </div>
      {customer.address ? (
        <CustomerAddressList address={customer.address} />
      ) : null}

      {viewGraph ? (
        <Suspense fallback={<SmallLoading />}>
          <CustomerReportByPieChart />
        </Suspense>
      ) : null}
    </div>
  );
}
