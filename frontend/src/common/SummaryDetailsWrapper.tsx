import { Suspense, useState } from "react";
import SmallLoading from "../pages/dashboard/SmallLoading";
export type SummaryDetailsWrapperProps = {
  summaryText: string;
  children?: JSX.Element;
};
export default function SummaryDetailsWrapper(
  props: SummaryDetailsWrapperProps
) {
  const [showFullTab, setShowFullTab] = useState<boolean>();

  return (
    <details>
      <summary
        onClick={() => setShowFullTab(!showFullTab)}
        style={{
          fontWeight: "bold",
        }}
      >
        {props.summaryText}
      </summary>
      {showFullTab ? (
        <Suspense fallback={<SmallLoading />}>{props.children}</Suspense>
      ) : null}
    </details>
  );
}
