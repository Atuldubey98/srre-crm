import { FormEventHandler } from "react";
import { AboutSection } from "../../common/PageLeftRight";
import CustomerFields from "./CustomerFields";
import ServicesGivenFields from "./ServicesGivenFields";
import useReportForm from "./useReportForm";

export default function FormServiceReport() {
  const { state, operations } = useReportForm();
  const { customer, customerAddress, acMetaInfo } = state;
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <AboutSection>
      <form onSubmit={onSubmit}>
        <CustomerFields
          customer={customer}
          customerAddress={customerAddress}
          onChangeCustomerField={operations.onChangeReportField}
        />
        <ServicesGivenFields acMetaInfo={acMetaInfo} />
      </form>
    </AboutSection>
  );
}
