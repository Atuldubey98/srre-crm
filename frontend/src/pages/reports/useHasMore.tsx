import { useCallback, useState } from "react";

export default function useHasMore() {
  const [queryParams, setQueryParams] = useState<{
    skip: number;
    limit: number;
  }>({
    skip: 0,
    limit: 10,
  });
  const [hasMore, setHashMoreReports] = useState<boolean>(true);

  const onIncrementSkip = () => {
    setQueryParams({
      ...queryParams,
      skip: queryParams.skip + 10,
    });
  };
  const onSetSkip = (skip: number) => {
    setQueryParams({
      ...queryParams,
      skip,
    });
  };
  const onSetHasMoreReports = useCallback((hasMoreData: boolean) => {
    setHashMoreReports(hasMoreData);
  }, []);
  return {
    queryParams,
    onIncrementSkip,
    onSetHasMoreReports,
    hasMore,
    onSetSkip,
  };
}
