import { Types } from "mongoose";
import Report from "./report.model.js";
import { getReportsCSVFileData } from "./report.generation.js";

export default function reportRepository() {
  async function getCountNumberOfReportsOfCustomer(customerId) {
    return Report.count({ customer: customerId });
  }
  async function getCountNumberOfReportsOfCustomerByAddressId(
    customerAddressId
  ) {
    return Report.count({ customerAddress: customerAddressId });
  }
  async function createServiceReport(report) {
    const serviceReport = new Report(report);
    return serviceReport.save();
  }
  const reportPipeLine = [
    {
      $unwind: "$acMetaInfo",
    },
    {
      $lookup: {
        from: "acservices",
        localField: "acMetaInfo.services",
        foreignField: "_id",
        as: "acMetaInfo.services",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          customer: "$customer",
          customerAddress: "$customerAddress",
          serviceDate: "$serviceDate",
          typeOfCall: "$typeOfCall",
          siteContactPerson: "$siteContactPerson",
          status: "$status",
          description: "$description",
          technician: "$technician",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
        acMetaInfo: { $push: "$acMetaInfo" },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        customer: "$_id.customer",
        customerAddress: "$_id.customerAddress",
        serviceDate: "$_id.serviceDate",
        typeOfCall: "$_id.typeOfCall",
        siteContactPerson: "$_id.siteContactPerson",
        status: "$_id.status",
        description: "$_id.description",
        technician: "$_id.technician",
        createdAt: "$_id.createdAt",
        updatedAt: "$_id.updatedAt",
        acMetaInfo: "$acMetaInfo",
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "customerAddress",
        foreignField: "_id",
        as: "customerAddress",
      },
    },
    {
      $lookup: {
        from: "technicians",
        localField: "technician",
        foreignField: "_id",
        as: "technician",
      },
    },
    { $unwind: "$technician" },
    { $unwind: "$customer" },
    { $unwind: "$customerAddress" },
    {
      $project: {
        serviceDate: 1,
        customer: {
          _id: "$customer._id",

          name: "$customer.name",
          contact: "$customer.contact",
        },
        customerAddress: 1,
        acMetaInfo: 1,
        siteContactPerson: 1,
        technician: 1,
        status: 1,
        description: 1,
        typeOfCall: 1,
      },
    },
  ];
  async function downloadServiceReportsByFilter(filter) {
    const reports = await Report.aggregate([
      { $match: filter },
      ...reportPipeLine,
    ]);
    const csvFileData = getReportsCSVFileData(reports);
    return csvFileData;
  }
  async function updateServiceReport(reportId, report) {
    return Report.findByIdAndUpdate(reportId, report, { new: true });
  }
  /**
   *
   * @param {string} reportId
   * @returns {Promise<Document|null>}
   */
  async function getReportById(reportId) {
    return Report.aggregate([
      { $match: { _id: new Types.ObjectId(reportId) } },
      ...reportPipeLine,
    ]);
  }
  async function deleteReportById(reportId) {
    return Report.findByIdAndDelete(reportId);
  }
  /**
   *
   * @param {string} customerId
   * @param {number} limit
   * @param {number} skip
   * @returns {Promise<Array<Document|null>}
   */
  async function getServiceReportsByCustomerId(
    customerId,
    limit = 10,
    skip = 0
  ) {
    return Report.aggregate([
      { $match: { customer: new Types.ObjectId(customerId) } },
      ...reportPipeLine,
      { $skip: skip },
      { $limit: limit },
    ]);
  }
  async function getServiceReports(skip = 0, limit = 10) {
    return Report.aggregate([
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      ...reportPipeLine,
    ]);
  }
  return Object.freeze({
    createServiceReport,
    getServiceReports,
    deleteReportById,
    getReportById,
    downloadServiceReportsByFilter,
    getServiceReportsByCustomerId,
    updateServiceReport,
    getCountNumberOfReportsOfCustomerByAddressId,
    getCountNumberOfReportsOfCustomer,
  });
}
