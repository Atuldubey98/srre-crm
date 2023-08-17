import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Button from "../../common/Button";
import FormLabelField from "../../common/FormLabelField";
import "./CustomerServicesUsedCsvGenerator.css";
import SelectCustomers from "./SelectCustomers";
import { downloadCustomerServicesCount } from "./serviceReportsApi";
export type CustomerServicesUsedCsvGeneratorFormFields = {
  customer: string;
  fromDate: string;
  toDate: string;
  allCustomers: boolean;
};
export default function CustomerServicesUsedCsvGenerator() {
  const [formFields, setFormFields] =
    useState<CustomerServicesUsedCsvGeneratorFormFields>({
      customer: "",
      fromDate: "",
      toDate: "",
      allCustomers: false,
    });
  const onSubmitReportsDownloadForm: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const response = await downloadCustomerServicesCount(formFields);
      const file = new Blob([response.data]);
      const fileURL = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `ServiceReports:${new Date().toISOString()}.csv`;
      a.click();
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeCustomerDisableField: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setFormFields({
      ...formFields,
      allCustomers: !formFields.allCustomers,
      customer: "",
    });
  };
  const onChangeField: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setFormFields({
      ...formFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <details>
      <summary
        style={{
          fontWeight: "600",
        }}
      >
        Services being used by Customer
      </summary>
      <form onSubmit={onSubmitReportsDownloadForm}>
        <div className="d-grid report__generationDates">
          <FormLabelField
            label="From Date"
            input={{
              name: "fromDate",
              value: formFields.fromDate,
              onChange: onChangeField,
              type: "date",
            }}
          />
          <FormLabelField
            label="To Date"
            input={{
              type: "date",
              name: "toDate",
              value: formFields.toDate,
              min: formFields.fromDate,
              onChange: onChangeField,
            }}
          />
        </div>
        <div className="form__labelField">
          <label htmlFor="allcustomer">All Customers</label>
          <input
            name="customerFieldDisabled"
            type="checkbox"
            onChange={onChangeCustomerDisableField}
            checked={formFields.allCustomers}
          />
        </div>
        <SelectCustomers
          customer={formFields.customer}
          customerFieldDisabled={formFields.allCustomers}
          onChangeCustomerField={onChangeField}
        />
        <Button label="Reset" className="btn btn-info" type="reset" />
        <Button label="Download" className="btn btn-success" type="submit" />
      </form>
    </details>
  );
}
