import ACService, { typesOfACs } from "./acServices.model.js";
import Report from "../report-service/report.model.js";
import mongoose, { isValidObjectId } from "mongoose";
export default function acServiceRepository() {
  /**
   *
   * @param {string[]} acServiceIds
   * @returns {Promise<boolean>}
   */
  async function checkIfServiceIdBeingUsedInReport(acServiceIds) {
    const serviceObjectIds = acServiceIds
      .filter((serviceId) => isValidObjectId(serviceId))
      .map((serviceId) => new mongoose.Types.ObjectId(serviceId));
    const servicesBeingUsed = await Report.aggregate([
      {
        $unwind: "$acMetaInfo",
      },
      {
        $unwind: "$acMetaInfo.services",
      },
      {
        $group: {
          _id: "$acMetaInfo.services",
        },
      },
      {
        $match: { _id: { $in: serviceObjectIds } },
      },
    ]);
    return servicesBeingUsed.length > 0;
  }
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
      if (!typeOfAC) {
        const services = await ACService.aggregate([
          {
            $project: {
              typeOfAC: "$typeOfAC",
              serviceGiven: { $concat: ["$serviceName", "-", "$typeOfAC"] },
            },
          },
        ]);
        return services;
      }
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
   * @returns {Promise<number>}
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
    checkIfServiceIdBeingUsedInReport,
  });
}
