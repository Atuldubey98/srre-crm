import Report from "../report-service/report.model.js";
import Technician from "./technician.model.js";

export default function technicianRespository() {
  async function getCountOfTechnicians() {
    return Technician.count({});
  }
  async function getTopPerformingTechnician() {
    const technicanTopPiped = await Report.aggregate([
      {
        $group: {
          _id: "$technician",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "technicians",
          localField: "_id",
          foreignField: "_id",
          as: "_id",
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $project: {
          technician: "$_id",
          _id: 0,
          count: "$count",
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      { $limit: 1 },
    ]);
    return technicanTopPiped[0] || null;
  }
  async function createTechnician(technicianData) {
    try {
      const technician = new Technician(technicianData);
      const savedTechnician = await technician.save();
      return savedTechnician;
    } catch (error) {
      throw error;
    }
  }
  async function getTechnicianById(technicianId) {
    try {
      const technician = await Technician.findById(technicianId);
      return technician;
    } catch (error) {
      throw error;
    }
  }
  async function getAllTechnicians() {
    try {
      const technicians = await Technician.find();
      return technicians;
    } catch (error) {
      throw error;
    }
  }
  async function updateTechnician(technicianId, updateData) {
    try {
      const updatedTechnician = await Technician.findByIdAndUpdate(
        technicianId,
        updateData,
        { new: true }
      );
      return updatedTechnician;
    } catch (error) {
      throw error;
    }
  }
  async function deleteTechnician(technicianId) {
    try {
      const deletedTechnician = await Technician.findByIdAndRemove(
        technicianId
      );
      return deletedTechnician;
    } catch (error) {
      throw error;
    }
  }
  return Object.freeze({
    createTechnician,
    deleteTechnician,
    updateTechnician,
    getTopPerformingTechnician,
    getAllTechnicians,
    getCountOfTechnicians,
    getTechnicianById,
  });
}
