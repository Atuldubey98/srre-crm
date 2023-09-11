export interface TechnicianBody {
  name: string;
  contactNumber: string;
  email: string;
  currentlyActive: "Active" | "Inactive";
}
export interface Technician extends TechnicianBody {
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  currentlyActive: "Active" | "Inactive";
}
