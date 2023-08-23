import DownloadAddressTemplateButton from "./DownloadAddressTemplateButton";
import "./UploadCustomerAddress.css";
import UploadCustomerAddressListForm from "./UploadCustomerAddressListForm";

export default function UploadCustomerAddress() {
  return (
    <details className="upload">
      <summary
        style={{
          fontWeight: "bold",
        }}
      >
        Upload customer address (csv file)
      </summary>
      <div className="direction">
        <p>Step 1: Download the template given below.</p>
        <DownloadAddressTemplateButton />
      </div>
      <div className="direction">
        <p>Step 2: Select the customer for which address has to be uploaded.</p>
        <UploadCustomerAddressListForm />
      </div>
    </details>
  );
}
