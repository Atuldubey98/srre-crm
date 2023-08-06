import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

export default function useNavigateWithQuery() {
  const query = useQuery();
  const navigate = useNavigate();

  function onNavigate(path: string) {
    navigate(`${path}${getNavigateQuery()}`);
  }
  function getNavigateQuery() {
    let buildQuery = "";
    let i = 0;
    for (const key of query.keys()) {
      buildQuery += `${i === 0 ? "/?" : ""}${key}=${query.get(key)}${
        i !== 0 ? "&" : ""
      }`;
      i++;
    }
    return buildQuery;
  }
  return { onNavigate, getNavigateQuery };
}
