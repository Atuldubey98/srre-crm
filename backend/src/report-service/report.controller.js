import { isValidObjectId } from "mongoose";
import { ReportNotFound } from "./errors.js";
import reportRepository from "./report.repository.js";
import { reportsSchema } from "./report.validations.js";
const {
  createServiceReport,
  getServiceReports,
  getReportById,
  deleteReportById,
  updateServiceReport,
} = reportRepository();
/**
 * @description : create service report
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export async function createServiceReportController(req, res, next) {
  try {
    const report = await reportsSchema.validateAsync(req.body);
    const serviceReport = await createServiceReport(report);
    return res.status(201).json({ status: true, data: serviceReport });
  } catch (error) {
    next(error);
  }
}

export async function getServiceReportsController(req, res, next) {
  try {
    const skip = isNaN(parseInt(req.query.skip)) ? 0 : parseInt(req.query.skip);
    const limit = isNaN(parseInt(req.query.limit))
      ? 10
      : parseInt(req.query.limit);
    const serviceReports = await getServiceReports(skip, limit);
    return res.status(200).json({ status: true, data: serviceReports });
  } catch (error) {
    next(error);
  }
}
export async function getServicesReportByIdController(req, res, next) {
  try {
    const reportId = req.params.reportId;
    if (!isValidObjectId(reportId)) {
      throw new ReportNotFound();
    }
    const reports = await getReportById(reportId);
    if (reports.length === 0) {
      throw new ReportNotFound();
    }
    return res.status(200).json({ status: true, data: reports[0] });
  } catch (error) {
    next(error);
  }
}

export async function deleteReportByIdController(req, res, next) {
  try {
    const reportId = req.params.reportId;
    if (!isValidObjectId(reportId)) {
      throw new ReportNotFound();
    }
    const report = await deleteReportById(reportId);
    if (!report) {
      throw new ReportNotFound();
    }
    return res
      .status(204)
      .json({ status: true, message: "Service Report deleted" });
  } catch (error) {
    next(error);
  }
}

export async function updateServiceReportController(req, res, next) {
  try {
    const reportId = req.params.reportId;
    if (!isValidObjectId(reportId)) {
      throw new ReportNotFound();
    }
    const report = await reportsSchema.validateAsync(req.body);
    const updatedReport = await updateServiceReport(reportId, report);
    if (!updatedReport) {
      throw new ReportNotFound();
    }
    return res.status(200).json({ status: true, data: updatedReport });
  } catch (error) {
    next(error);
  }
}
