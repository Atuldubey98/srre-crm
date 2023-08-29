import Address from "./address.model.js";
export default function addressRepository() {
  async function createAddress(customerAddress) {
    const address = new Address(customerAddress);
    return address.save();
  }
  async function createAddressList(addressList) {
    return Address.insertMany(addressList);
  }
  async function deleteAddressUsingIds(addressIdsList) {
    return Address.deleteMany({ _id: { $in: addressIdsList } });
  }
  async function getAddressById(addressId) {
    return Address.findById(addressId);
  }
  async function updateAddressById(addressId, newAddress) {
    return Address.findByIdAndUpdate(addressId, newAddress, { new: true });
  }
  async function deleteAddressById(addressId) {
    return Address.findByIdAndDelete(addressId);
  }
  return Object.freeze({
    createAddressList,
    deleteAddressById,
    updateAddressById,
    createAddress,
    getAddressById,
    deleteAddressUsingIds,
  });
}
