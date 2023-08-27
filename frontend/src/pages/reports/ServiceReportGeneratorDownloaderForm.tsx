import { useState, ChangeEventHandler, FormEventHandler } from "react";
import Button from "../../common/Button";
import FormLabelField from "../../common/FormLabelField";
import { Address } from "../customers/interfaces";
import CustomerNameAddressFields from "./CustomerNameAddressFields";
import { ServiceReportListFormFields } from "./ServiceReportCsvGenerationForm";
import { Customer } from "./interfaces";
import { downloadServiceReportsByFilter } from "./serviceReportsApi";

export default function ServiceReportGeneratorDownloaderForm() {
  const [serviceReportListFormFields, setServiceReportListFormFields] =
    useState<ServiceReportListFormFields>({
      customer: "",
      customerAddress: "",
      customerFieldDisabled: false,
      fromDate: "",
      toDate: "",
    });
  const onChangeCustomerDisableField: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setServiceReportListFormFields({
      ...serviceReportListFormFields,
      customerAddress: "",
      customer: serviceReportListFormFields.customerFieldDisabled
        ? serviceReportListFormFields.customer
        : "",
      customerFieldDisabled: !serviceReportListFormFields.customerFieldDisabled,
    });
  };
  const onChangeCustomerField: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => {
    setServiceReportListFormFields({
      ...serviceReportListFormFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const onChangeCustomerItemField = (customerItem: Customer | null) => {
    if (customerItem) {
      setServiceReportListFormFields({
        ...serviceReportListFormFields,
        customer: customerItem?._id,
      });
    }
  };
  const onSubmitReportsDownloadForm: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const response = await downloadServiceReportsByFilter(
        serviceReportListFormFields
      );
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
  const onAddressChange = (address: Address | null) => {
    if (address) {
      setServiceReportListFormFields((prev) => {
        return { ...prev, customerAddress: address._id };
      });
    }
  };
  return (
    <form onSubmit={onSubmitReportsDownloadForm}>
      <div className="form__labelField">
        <label htmlFor="allcustomer">All Customers</label>
        <input
          name="customerFieldDisabled"
          type="checkbox"
          onChange={onChangeCustomerDisableField}
          checked={serviceReportListFormFields.customerFieldDisabled}
        />
      </div>
      <CustomerNameAddressFields
        onAddressChange={onAddressChange}
        customerFieldDisabled={
          serviceReportListFormFields.customerFieldDisabled
        }
        customeAddressFieldRequired={false}
        customer={serviceReportListFormFields.customer}
        customerAddress={serviceReportListFormFields.customerAddress}
        onChangeCustomerField={onChangeCustomerItemField}
      />
      <div className="d-grid report__generationDates">
        <FormLabelField
          label="From Date"
          input={{
            name: "fromDate",
            type: "date",
            value: serviceReportListFormFields.fromDate,
            onChange: onChangeCustomerField,
          }}
        />
        <FormLabelField
          label="To Date"
          input={{
            type: "date",
            name: "toDate",
            onChange: onChangeCustomerField,
            min: serviceReportListFormFields.fromDate,
            value: serviceReportListFormFields.toDate,
          }}
        />
      </div>
      <Button
        disabled={
          !serviceReportListFormFields.customerFieldDisabled &&
          serviceReportListFormFields.customer.length === 0
        }
        label="Download"
        className="btn btn-success"
      />
    </form>
  );
}
