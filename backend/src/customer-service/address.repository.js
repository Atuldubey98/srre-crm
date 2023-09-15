import Address from "./address.model.js";
export default function addressRepository() {
  /**
   * create new new address
   * @param {Object} customerAddress 
   */
  async function createAddress(customerAddress) {
    const address = new Address(customerAddress);
    return address.save();
  }
  /**
   * 
   * @param {{location: string}[]} addressList 
   */
  async function createAddressList(addressList) {
    return Address.insertMany(addressList);
  }
  /**
   * delete all address by ids
   * @param {string[]} addressIdsList 
   */
  async function deleteAddressUsingIds(addressIdsList) {
    return Address.deleteMany({ _id: { $in: addressIdsList } });
  }
  /**
   * getting address by id
   * @param {string} addressId 
   */
  async function getAddressById(addressId) {
    return Address.findById(addressId);
  }
  /**
   * update address by id
   * @param {string} addressId 
   * @param {{location : string}} newAddress 
   */
  async function updateAddressById(addressId, newAddress) {
    return Address.findByIdAndUpdate(addressId, newAddress, { new: true });
  }

  /**
   * deleting address by id and return address
   * @param {string} addressId 
   */
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
