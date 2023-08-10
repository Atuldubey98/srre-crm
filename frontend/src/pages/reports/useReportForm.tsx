import { ChangeEventHandler, useReducer } from "react";
import { AcMetaInfo, ReportFormFields } from "./interfaces";

export default function useReportForm() {
  type State = ReportFormFields;
  type Action =
    | { type: "change:fields"; payload: { value: string; name: string } }
    | { type: "change:siteContact"; payload: { value: string; name: string } }
    | { type: "add:acMetaInfos"; payload: AcMetaInfo }
    | { type: "update:acMetaInfos"; payload: AcMetaInfo }
    | { type: "remove:acMetaInfos"; payload: string }
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
          siteContactPerson: {
            ...state.siteContactPerson,
            [action.payload.name]: action.payload.value,
          },
        };
      case "add:acMetaInfos":
        return {
          ...state,
          acMetaInfo: [...state.acMetaInfo, action.payload],
        };
      case "remove:acMetaInfos":
        return {
          ...state,
          acMetaInfo: state.acMetaInfo.filter(
            (service) => service._id !== action.payload
          ),
        };
      case "update:acMetaInfos":
        return {
          ...state,
          acMetaInfo: state.acMetaInfo.map((acmeta) =>
            acmeta._id === action.payload._id ? { ...action.payload } : acmeta
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
    serviceDate: "",
    siteContactPerson: {
      identification: "",
      contactNumber: "",
    },
    acMetaInfo: [],
  });
  const onSetNewState = (newState: ReportFormFields) => {
    dispatch({ type: "set", payload: newState });
  };
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
    dispatch({ type: "add:acMetaInfos", payload: service });
    console.log(service);
  };
  const onRemoveService = (serviceId: string) => {
    dispatch({ type: "remove:acMetaInfos", payload: serviceId });
  };
  const onUpdateService = (acmeta: AcMetaInfo) => {
    dispatch({ type: "update:acMetaInfos", payload: acmeta });
  };
  const onSetDefaultState = () => {
    dispatch({
      type: "set",
      payload: {
        customer: "",
        customerAddress: "",
        description: "",
        status: "Complete",
        technician: "",
        serviceDate: "",
        siteContactPerson: {
          identification: "",
          contactNumber: "",
        },
        acMetaInfo: [],
      },
    });
  };
  const operations = {
    onUpdateService,
    onChangeReportField,
    onChangeContactField,
    onAddService,
    onRemoveService,
    onSetDefaultState,
    onSetNewState,
  };
  return {
    operations,
    state,
  };
}
