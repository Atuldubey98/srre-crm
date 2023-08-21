import mongoose, { isValidObjectId } from "mongoose";
import { ReportNotFound } from "./errors.js";
import reportRepository from "./report.repository.js";
import { reportsSchema } from "./report.validations.js";
import { generateHTMlForPdfOfReport } from "./report.generation.js";

const {
  createServiceReport,
  getServiceReports,
  getReportById,
  deleteReportById,
  updateServiceReport,
  downloadServiceReportsByFilter,
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
    const reports = await getReportById(serviceReport.id);
    if (reports.length === 0) {
      throw new ReportNotFound();
    }
    return res.status(201).json({ status: true, data: reports[0] });
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
    const reports = await getReportById(reportId);
    if (reports.length === 0 || !updatedReport) {
      throw new ReportNotFound();
    }
    return res.status(200).json({ status: true, data: reports[0] });
  } catch (error) {
    next(error);
  }
}
export async function downloadServiceReportsByFilterController(req, res, next) {
  const customer =
    typeof req.query.customer === "string" ? req.query.customer : "all";
  const customerAddress =
    typeof req.query.customerAddress === "string"
      ? req.query.customerAddress
      : "";
  let filter = {};
  if (isValidObjectId(customer)) {
    filter = { customer: new mongoose.Types.ObjectId(customer) };
  }
  if (isValidObjectId(customerAddress)) {
    filter = {
      ...filter,
      customerAddress: new mongoose.Types.ObjectId(customerAddress),
    };
  }
  const fromDate =
    typeof req.query.fromDate === "string" ? req.query.fromDate : "";
  const toDate = typeof req.query.toDate === "string" ? req.query.toDate : "";

  if (fromDate) {
    filter = { ...filter, serviceDate: { $gte: new Date(fromDate) } };
  }
  if (toDate) {
    filter = {
      ...filter,
      serviceDate: { ...(filter.serviceDate || {}), $lte: new Date(toDate) },
    };
  }
  try {
    const csvFileData = await downloadServiceReportsByFilter(filter);
    const csvData = csvFileData.join("\n");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csvData);
  } catch (error) {
    next(error);
  }
}

/**
 * download pdf format for the service report
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export async function downloadServiceReportByReportId(req, res, next) {
  try {
    const reportId = req.params.reportId;
    if (!isValidObjectId(reportId)) {
      throw new ReportNotFound();
    }
    const reports = await getReportById(reportId);
    if (reports.length === 0) {
      throw new ReportNotFound();
    }
    const htmlContentOfReport = await generateHTMlForPdfOfReport(reports[0]);
    res.setHeader("Content-Type", "text/html");
    res.send(htmlContentOfReport);
  } catch (error) {
    next(error);
  }
}
