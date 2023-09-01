import { Contact } from "./interfaces";

export type CustomerContactProps = {
  contact: Contact;
};
export default function CustomerContact(props: CustomerContactProps) {
  return props.contact.name || props.contact.phoneNumber ? (
    <section className="customer__contact d-grid">
      <p>Contact Person</p>
      <fieldset>
        <p>{props.contact.name}</p>
        <p>{props.contact.phoneNumber || ""}</p>
      </fieldset>
    </section>
  ) : null;
}
