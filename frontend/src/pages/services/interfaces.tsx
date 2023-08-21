export interface ServiceFilter {
  typeOfAC: string;
  serviceName: string;
}
export interface CreateServiceBody extends ServiceFilter {}
export interface Service extends ServiceFilter {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface ServiceUsedWithCount extends Service {
  noOfTimesServiceUsed: number;
}
export interface TypeOfServiceGiven {
  _id: string;
  serviceGiven: string;
  typeOfAC: string;
}
export const acOptions: { [key: string]: string } = {
  all: "All",
  splitac: "Split AC",
  windowac: "Window AC",
  centralac: "Central AC",
  portableac: "Portable AC",
  "ductless-mini-splitac": "Ductless Mini-Split AC",
  packageac: "Package AC",
  "floor-mountedac": "Floor-Mounted AC",
  towerac: "Tower AC",
  hybridac: "Hybrid AC",
  "geo-thermalac": "Geo-Thermal AC",
  "evaporative-coolerac": "Evaporative Cooler AC",
  "chiller-waterac": "Chiller Water AC",
  otherac: "Other AC",
};
export const acTypeOptions: { value: string; field: string }[] = [
  { value: "all", field: "All" },
  { value: "splitac", field: "Split AC" },
  { value: "windowac", field: "Window AC" },
  { value: "centralac", field: "Central AC" },
  { value: "portableac", field: "Portable AC" },
  { value: "ductless-mini-splitac", field: "Ductless Mini-Split AC" },
  { value: "packageac", field: "Package AC" },
  { value: "floor-mountedac", field: "Floor-Mounted AC" },
  { value: "towerac", field: "Tower AC" },
  { value: "hybridac", field: "Hybrid AC" },
  { value: "geo-thermalac", field: "Geo-Thermal AC" },
  { value: "evaporative-coolerac", field: "Evaporative Cooler AC" },
  { value: "chiller-waterac", field: "Chiller Water AC" },
  { value: "otherac", field: "Other AC" },
];

export const acTypeOptionsWithoutAll: { value: string; field: string }[] = [
  { value: "all", field: "All" },
  { value: "splitac", field: "Split AC" },
  { value: "windowac", field: "Window AC" },
  { value: "centralac", field: "Central AC" },
  { value: "portableac", field: "Portable AC" },
  { value: "ductless-mini-splitac", field: "Ductless Mini-Split AC" },
  { value: "packageac", field: "Package AC" },
  { value: "floor-mountedac", field: "Floor-Mounted AC" },
  { value: "towerac", field: "Tower AC" },
  { value: "hybridac", field: "Hybrid AC" },
  { value: "geo-thermalac", field: "Geo-Thermal AC" },
  { value: "evaporative-coolerac", field: "Evaporative Cooler AC" },
  { value: "chiller-waterac", field: "Chiller Water AC" },
  { value: "otherac", field: "Other AC" },
];
