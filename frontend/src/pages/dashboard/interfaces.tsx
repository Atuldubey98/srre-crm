import { Technician } from "../technicians/interfaces";
export type CustomerReportCount = {
  _id: string;
  name: string;
  count: number;
};
type TechnicianCountByReports = {
  topPerformingTechnician: {
    technician: Technician;
    count: number;
  };
  count: number;
};

export type DashboardInformation = {
  customer: {
    count: number;
  };
  technician: TechnicianCountByReports | null;
};

export type PieData = {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      weight: 1;
    }
  ];
};
