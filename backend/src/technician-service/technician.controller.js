import Joi from "joi";
import technicianRespository from "./technician.repository.js";
import { TechnicianNotFound } from "./errors.js";
import { createTechnicianSchema } from "./technician.validation.js";
import { isValidObjectId } from "mongoose";
const {
  getTechnicianById,
  createTechnician,
  getAllTechnicians,
  deleteTechnician,
  updateTechnician,
} = technicianRespository();
/**
 * @description : get technican by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function getTechnicianByIdController(req, res, next) {
  try {
    const technicianId = await Joi.string().validateAsync(
      req.params.technicianId
    );
    const technician = await getTechnicianById(technicianId);
    if (!technician) {
      throw new TechnicianNotFound();
    }
    return res.status(200).json({ status: true, data: technician });
  } catch (error) {
    next(error);
  }
}

/**
 * @description : get technican by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function updateTechnicianByIdController(req, res, next) {
  try {
    const technicianId = await Joi.string().validateAsync(
      req.params.technicianId
    );
    const technician = await updateTechnician(technicianId, req.body);
    if (!technician) {
      throw new TechnicianNotFound();
    }
    return res.status(200).json({ status: true, data: technician });
  } catch (error) {
    next(error);
  }
}
/**
 * @description : create technican
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function createTechnicianController(req, res, next) {
  try {
    const technican = await createTechnicianSchema.validateAsync(req.body);
    const newTechnician = await createTechnician(technican);
    return res.status(201).json({ status: true, data: newTechnician });
  } catch (error) {
    next(error);
  }
}

/**
 * @description : get technicans
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function getAllTechniciansController(req, res, next) {
  try {
    const technicans = await getAllTechnicians();
    return res.status(200).json({ status: true, data: technicans });
  } catch (error) {
    next(error);
  }
}
export async function deleteTechnicianByIdController(req, res, next) {
  try {
    if (!isValidObjectId(req.params.technicianId)) {
      throw new TechnicianNotFound();
    }
    const technican = await deleteTechnician(req.params.technicianId);
    if (!technican) {
      throw new TechnicianNotFound();
    }
    return res
      .status(204)
      .json({ status: true, message: "Technician deleted" });
  } catch (error) {
    next(error);
  }
}
