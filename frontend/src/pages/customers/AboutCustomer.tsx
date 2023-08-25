import { isAxiosError } from "axios";
import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import MessageBody, { MessageBodyProps } from "../../common/MessageBody";
import { AboutSection } from "../../common/PageLeftRight";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import "./AboutCustomer.css";
import CustomerAddressList from "./CustomerAddressList";
import CustomerContact from "./CustomerContact";
import CustomerNotFound from "./CustomerNotFound";
import CustomerReportByPieChart from "./CustomerReportByPieChart";
import OperationBtnsGroup from "./OperationBtnsGroup";
import { deleteCustomerById } from "./customersApi";
import useSingleCustomer from "./useSingleCustomer";

function AboutCustomerElement() {
  const { customer, customerLoading, messageBody: error } = useSingleCustomer();
  const navigate = useNavigate();
  const { onNavigate } = useNavigateWithQuery();
  const [messageBody, setMessageBody] = useState<MessageBodyProps>({
    type: "success",
    body: "",
  });
  const { customerId } = useParams();
  useEffect(() => {
    setMessageBody({ type: "success", body: "" });
  }, [customerId]);
  const [viewGraph, setViewGraph] = useState<boolean>(false);
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
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/customers/new"
        operationLabel="Add new Customer"
        searchPlaceHolder="Search customer by id"
        searchUrl="/customers"
      />
      {customerLoading ? (
        <LoadingIndicatorAbout loading={customerLoading} />
      ) : customer ? (
        <div className="customer d-grid">
          <h1>{customer.name}</h1>
          {customer.contact ? (
            <CustomerContact contact={customer.contact} />
          ) : null}
          {customer.address ? (
            <CustomerAddressList address={customer.address} />
          ) : null}
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
          {viewGraph ? <CustomerReportByPieChart /> : null}
        </div>
      ) : (
        <CustomerNotFound />
      )}
    </AboutSection>
  );
}
const AboutCustomer = memo(AboutCustomerElement);
export default AboutCustomer;
