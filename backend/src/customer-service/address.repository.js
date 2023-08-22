import Address from "./address.model.js";
export default function addressRepository() {
  async function createAddressList(addressList) {
    return Address.insertMany(addressList);
  }
  async function deleteAddressUsingIds(addressIdsList) {
    return Address.deleteMany({ _id: { $in: addressIdsList } });
  }
  return Object.freeze({
    createAddressList,
    deleteAddressUsingIds,
  });
}
