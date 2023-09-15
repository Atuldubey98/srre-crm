import customerRepository from "../customer-service/customer.repository.js";
import technicianRespository from "../technician-service/technician.repository.js";
const { getCountOfCustomers, getCountReportforCustomerByIdForLast30Days } =
  customerRepository();
const { getTopPerformingTechnician, getCountOfTechnicians } =
  technicianRespository();
/**
 * getting dashboard content controller
 * @type {import("express").Handler}
 */
export async function getDashboardContentController(req, res, next) {
  try {
    const customerCount = await getCountOfCustomers();
    const countOfReportsByCustomer =
      await getCountReportforCustomerByIdForLast30Days();
    const [topPerformingTechnician, technicanCount] = await Promise.all([
      await getTopPerformingTechnician(),
      await getCountOfTechnicians(),
    ]);
    return res.status(200).json({
      status: true,
      data: {
        customer: { count: customerCount },
        technician: { topPerformingTechnician, count: technicanCount },
        reports: {
          lastThirtyDaysReportsCountCustomers: countOfReportsByCustomer,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}
