import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import { AboutSection } from "../../common/PageLeftRight";
import "./AboutCustomer.css";
import CustomerAddressList from "./CustomerAddressList";
import CustomerContact from "./CustomerContact";
import { Customer } from "./interfaces";
import { deleteCustomerById } from "./customersApi";
import useNavigateWithQuery from "../../common/useNavigateWithQuery";
import OperationBtnsGroup from "./OperationBtnsGroup";
import CustomerNotFound from "./CustomerNotFound";
import { MessageBodyProps } from "../../common/MessageBody";
import LoadingIndicatorAbout from "../../common/LoadingIndicatorAbout";
import { memo } from "react";
export type AboutCustomerProps = {
  customer: Customer | null;
  customerLoading: boolean;
  message: MessageBodyProps;
};
function AboutCustomer(props: AboutCustomerProps) {
  const navigate = useNavigate();
  const { onNavigate } = useNavigateWithQuery();
  const { customerId } = useParams();
  const { customerLoading: loading } = props;
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
            <Button label="View Services" className="btn" />
            <Button
              label="Delete Customer"
              className="btn btn-danger"
              onClick={onDeleteCustomer}
            />
          </div>
        </div>
      ) : customerId ? (
        <CustomerNotFound />
      ) : null}
    </AboutSection>
  );
}

export default memo(AboutCustomer);
