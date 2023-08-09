import { ChangeEventHandler, useReducer } from "react";
import { AcMetaInfo, ServiceReportStatus } from "./interfaces";

export default function useReportForm() {
  interface ReportFormFields {
    _id?: string;
    customer: string;
    customerAddress: string;
    description: string;
    status: ServiceReportStatus;
    technician: string;
    siteContact: {
      identification: string;
      phoneNumber: string;
    };
    acMetaInfo: AcMetaInfo[];
  }

  type State = ReportFormFields;
  type Action =
    | { type: "change:fields"; payload: { value: string; name: string } }
    | { type: "change:siteContact"; payload: { value: string; name: string } }
    | { type: "add:service"; payload: AcMetaInfo }
    | { type: "remove:service"; payload: string }
    | { type: "set"; payload: ReportFormFields };
  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "change:fields":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "change:siteContact":
        return {
          ...state,
          siteContact: {
            ...state.siteContact,
            [action.payload.name]: action.payload.value,
          },
        };
      case "add:service":
        return {
          ...state,
          acMetaInfo: [...state.acMetaInfo, action.payload],
        };
      case "remove:service":
        return {
          ...state,
          acMetaInfo: state.acMetaInfo.filter(
            (service) => service._id !== action.payload
          ),
        };
      case "set":
        return {
          ...action.payload,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    customer: "",
    customerAddress: "",
    description: "",
    status: "Complete",
    technician: "",
    siteContact: {
      identification: "",
      phoneNumber: "",
    },
    acMetaInfo: [],
  });
  const onChangeReportField: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    dispatch({ type: "change:fields", payload: { name, value } });
  };
  const onChangeContactField: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    dispatch({ type: "change:siteContact", payload: { name, value } });
  };
  const onAddService = (service: AcMetaInfo) => {
    dispatch({ type: "add:service", payload: service });
  };
  const onRemoveService = (serviceId: string) => {
    dispatch({ type: "remove:service", payload: serviceId });
  };
  const operations = {
    onChangeReportField,
    onChangeContactField,
    onAddService,
    onRemoveService,
  };
  return {
    operations,
    state,
  };
}
