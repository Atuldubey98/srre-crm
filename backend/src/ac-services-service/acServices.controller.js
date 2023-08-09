import { acTypeSchema, newACServiceSchema } from "./acServices.validation.js";
import acServiceRepository from "./acServices.repository.js";
import Joi from "joi";
import { ServiceNotFound } from "./errors.js";
const {
  createAcService,
  createServicesForAllTypesOfACs,
  getAllAcServicesByAcType,
  deleteServicesByIds,
  findServiceById,
} = acServiceRepository();

/**
 * @description : create new services
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function createServiceController(req, res, next) {
  try {
    const acServiceBody = await newACServiceSchema.validateAsync(req.body);
    if (acServiceBody.typeOfAC !== "all") {
      const newService = await createAcService(acServiceBody);
      return res.status(201).json({
        status: true,
        data: {
          service: newService,
          count: 1,
        },
      });
    } else {
      const newServices = await createServicesForAllTypesOfACs(acServiceBody);
      return res.status(201).json({
        status: true,
        data: {
          services: newServices,
          count: newServices.length,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}
/**
 * @description : Get All AC services by ac type
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function getAllAirConditonerServicesByType(req, res, next) {
  try {
    let services = null;
    if (req.query.typeOfAC) {
      const typeOfAC = await acTypeSchema.validateAsync(req.query.typeOfAC);
      services = await getAllAcServicesByAcType(typeOfAC);
    } else {
      services = await getAllAcServicesByAcType("");
    }
    return res.status(200).json({ status: true, data: services });
  } catch (error) {
    next(error);
  }
}

/**
 * @description : Get service by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function getServiceByIdController(req, res, next) {
  try {
    const serviceId = await Joi.string().validateAsync(req.params.serviceId);
    const service = await findServiceById(serviceId);
    if (!service) {
      throw new ServiceNotFound();
    }
    return res.status(200).json({ status: true, data: service });
  } catch (error) {
    next(error);
  }
}
/**
 * @description : Delete service by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function deleteServiceByIdController(req, res, next) {
  try {
    const serviceIds = await Joi.string().validateAsync(req.query.serviceIds);
    if (serviceIds.split(",").length <= 0) {
      throw new ServiceNotFound();
    }
    const totalDeleted = await deleteServicesByIds(serviceIds.split(","));
    return res.status(204).json({
      status: true,
      message: `Deleted ${totalDeleted}`,
    });
  } catch (error) {
    next(error);
  }
}
