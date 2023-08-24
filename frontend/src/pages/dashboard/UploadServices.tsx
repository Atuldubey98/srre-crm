import DownloadServicesUploadTemplateButton from "./DownloadServicesUploadTemplateButton";
import UploadServicesForm from "./UploadServicesForm";
import UploadServicesList from "./UploadServicesList";

export default function UploadServices() {
  return (
    <details className="upload">
      <summary
        style={{
          fontWeight: "bold",
        }}
      >
        Upload services offered
      </summary>
      <div className="direction">
        <p>Step 1: Download the template given below.</p>
        <DownloadServicesUploadTemplateButton />
      </div>
      <div className="direction">
        <p>
          Step 2: Fill the services offered but keep the typeOfAC as it is and
          fill the serviceName column
        </p>
        <i>Type of AC Codes are given below :</i>
        <UploadServicesList />
      </div>
      <div className="direction">
        <p>
          Step 3: After filling all the services in the csv template upload the
          file.
        </p>
        <UploadServicesForm />
      </div>
    </details>
  );
}
