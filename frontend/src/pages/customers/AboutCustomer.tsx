import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { MessageBodyProps } from "../../common/MessageBody";
import { AboutSection } from "../../common/PageLeftRight";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import "./AboutCustomer.css";
import CustomerAddressList from "./CustomerAddressList";
import CustomerContact from "./CustomerContact";
import CustomerNotFound from "./CustomerNotFound";
import CustomerReportByPieChart from "./CustomerReportByPieChart";
import OperationBtnsGroup from "./OperationBtnsGroup";
import { deleteCustomerById } from "./customersApi";
import { Customer } from "./interfaces";
export type AboutCustomerProps = {
  customer: Customer | null;
  customerLoading: boolean;
  message: MessageBodyProps;
};
function AboutCustomerElement(props: AboutCustomerProps) {
  const navigate = useNavigate();
  const { onNavigate } = useNavigateWithQuery();
  const { customerId } = useParams();
  const { customerLoading: loading } = props;
  const [viewGraph, setViewGraph] = useState<boolean>(false);
  const onToggleGraph = () => {
    setViewGraph(!viewGraph);
  };
  const onDeleteCustomer = async () => {
    try {
      if (confirm("Do you want to delete the customer ?")) {
        await deleteCustomerById(props.customer?._id || "");
        navigate("/customers");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AboutSection>
      <OperationBtnsGroup
        navigationUrl="/customers/new"
        operationLabel="Add new Customer"
      />
      {loading ? (
        <LoadingIndicatorAbout loading={loading} />
      ) : props.customer ? (
        <div className="customer d-grid">
          <h1>{props.customer.name}</h1>
          {props.customer.contact ? (
            <CustomerContact contact={props.customer.contact} />
          ) : null}
          {props.customer.address ? (
            <CustomerAddressList address={props.customer.address} />
          ) : null}
          <div className="btn-group d-flex-center">
            <Button
              label="Edit Customer"
              className="btn btn-info"
              onClick={() => {
                onNavigate(`/customers/${props.customer?._id}/edit`);
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
      ) : customerId ? (
        <CustomerNotFound />
      ) : null}
    </AboutSection>
  );
}
const AboutCustomer = memo(AboutCustomerElement);
export default AboutCustomer;
