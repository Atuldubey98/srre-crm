import Address from "./address.model.js";
export default function addressRepository() {
  async function createAddressList(addressList) {
    return Address.insertMany(addressList);
  }
  async function deleteAddressUsingIds(addressIdsList) {
    return Address.deleteMany({ _id: { $in: addressIdsList } });
  }
  async function getAddressById(addressId) {
    return Address.findById(addressId);
  }
  return Object.freeze({
    createAddressList,
    getAddressById,
    deleteAddressUsingIds,
  });
}
