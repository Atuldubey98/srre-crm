import DownloadAddressTemplateButton from "./DownloadAddressTemplateButton";
import UploadCustomerAddressListForm from "./UploadCustomerAddressListForm";

export default function UploadCustomerAddressSteps() {
  return (
    <div className="steps">
      <div className="direction">
        <p>Step 1: Download the template given below.</p>
        <DownloadAddressTemplateButton />
      </div>
      <div className="direction">
        <p>Step 2: Select the customer for which address has to be uploaded.</p>
        <UploadCustomerAddressListForm />
      </div>
    </div>
  );
}
