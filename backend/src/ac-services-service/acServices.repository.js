import ACService, { typesOfACs } from "./acServices.model.js";

export default function acServiceRepository() {
  /**
   *
   * @param {{serviceName : string}} acServiceBody
   *  @returns {Promise<Model<{ typeOfAC: string; serviceName: string;}>>}
   */
  async function createAcService(acServiceBody) {
    try {
      const acService = new ACService(acServiceBody);
      await acService.save();
      return acService;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {{serviceName : string}} acServiceBody
   *  @returns {Promise<Model<{ typeOfAC: string; serviceName: string;}>[]>}
   */
  async function createServicesForAllTypesOfACs(acServiceBody) {
    try {
      const { serviceName } = acServiceBody;
      const services = typesOfACs.map((typeOfAC) => {
        return { typeOfAC, serviceName };
      });
      const newServices = await ACService.insertMany(services);
      return newServices;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {string} typeOfAC
   * @returns {Promise<Model<{ typeOfAC: string; serviceName: string;}>[]>}
   */
  async function getAllAcServicesByAcType(typeOfAC) {
    try {
      const services = await ACService.find(
        typeOfAC === "all" ? {} : { typeOfAC }
      );
      return services;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {string[]} acServiceIds
   * @returns {Promise<number}
   */
  async function deleteServicesByIds(acServiceIds) {
    try {
      await ACService.deleteMany({
        _id: { $in: acServiceIds },
      });
      return acServiceIds.length;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {string} serviceId
   * @returns {Promise<Document | null>}
   */
  async function findServiceById(serviceId) {
    try {
      const service = await ACService.findById(serviceId);
      return service;
    } catch (error) {
      throw error;
    }
  }
  return Object.freeze({
    createAcService,
    findServiceById,
    createServicesForAllTypesOfACs,
    getAllAcServicesByAcType,
    deleteServicesByIds,
  });
}
