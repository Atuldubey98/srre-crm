import { Types } from "mongoose";
import Report from "./report.model.js";
export default function reportRepository() {
  async function createServiceReport(report) {
    const serviceReport = new Report(report);
    return serviceReport.save();
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
          from: "technicians",
          localField: "technician",
          foreignField: "_id",
          as: "technician",
        },
      },
      { $unwind: "$technician" },
      {
        $lookup: {
          from: "acservices",
          localField: "acMetaInfo.services",
          foreignField: "_id",
          as: "acMetaInfoServices",
        },
      },
      { $unwind: "$customer" },
      {
        $project: {
          serviceDate: 1,
          customer: {
            _id: "$customer._id",
            name: "$customer.name",
            contact: "$customer.contact",
          },
          customerAddress: {
            $filter: {
              input: "$customer.address",
              as: "address",
              cond: {
                $eq: ["$$address._id", "$customerAddress"],
              },
            },
          },
          acMetaInfo: {
            $map: {
              input: "$acMetaInfo",
              as: "ac",
              in: {
                tonnage: "$$ac.tonnage",
                modelNumber: "$$ac.modelNumber",
                typeOfAC: "$$ac.typeOfAC",
                services: "$acMetaInfoServices",
                _id: "$$ac._id",
              },
            },
          },
          siteContactPerson: "$siteContactPerson",
          status: 1,

          technician: "$technician",
        },
      },
      { $unwind: "$customerAddress" },
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
          from: "technicians",
          localField: "technician",
          foreignField: "_id",
          as: "technician",
        },
      },
      { $unwind: "$technician" },
      {
        $lookup: {
          from: "acservices",
          localField: "acMetaInfo.services",
          foreignField: "_id",
          as: "acMetaInfoServices",
        },
      },
      { $unwind: "$customer" },
      {
        $project: {
          serviceDate: 1,
          customer: {
            _id: "$customer._id",
            name: "$customer.name",
            contact: "$customer.contact",
          },
          customerAddress: {
            $filter: {
              input: "$customer.address",
              as: "address",
              cond: {
                $eq: ["$$address._id", "$customerAddress"],
              },
            },
          },
          acMetaInfo: {
            $map: {
              input: "$acMetaInfo",
              as: "ac",
              in: {
                tonnage: "$$ac.tonnage",
                _id: "$$ac._id",

                modelNumber: "$$ac.modelNumber",
                typeOfAC: "$$ac.typeOfAC",
                services: "$acMetaInfoServices",
              },
            },
          },
          siteContactPerson: "$siteContactPerson",
          status: 1,

          technician: "$technician",
        },
      },
      { $unwind: "$customerAddress" },
      { $skip: skip },
      { $limit: limit },
    ]);
  }
  async function getServiceReports(skip = 0, limit = 10) {
    return Report.aggregate([
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
          from: "technicians",
          localField: "technician",
          foreignField: "_id",
          as: "technician",
        },
      },
      { $unwind: "$technician" },
      {
        $lookup: {
          from: "acservices",
          localField: "acMetaInfo.services",
          foreignField: "_id",
          as: "acMetaInfoServices",
        },
      },
      { $unwind: "$customer" },
      {
        $project: {
          serviceDate: 1,
          customer: {
            _id: "$customer._id",

            name: "$customer.name",
            contact: "$customer.contact",
          },
          customerAddress: {
            $filter: {
              input: "$customer.address",
              as: "address",
              cond: {
                $eq: ["$$address._id", "$customerAddress"],
              },
            },
          },
          acMetaInfo: {
            $map: {
              input: "$acMetaInfo",
              as: "ac",
              in: {
                tonnage: "$$ac.tonnage",
                _id: "$$ac._id",

                modelNumber: "$$ac.modelNumber",
                typeOfAC: "$$ac.typeOfAC",
                services: "$acMetaInfoServices",
              },
            },
          },
          siteContactPerson: "$siteContactPerson",
          technician: "$technician",
          status: 1,
        },
      },
      { $unwind: "$customerAddress" },
      { $skip: skip },
      { $limit: limit },
    ]);
  }
  return Object.freeze({
    createServiceReport,
    getServiceReports,
    deleteReportById,
    getReportById,
    getServiceReportsByCustomerId,
    updateServiceReport,
  });
}
