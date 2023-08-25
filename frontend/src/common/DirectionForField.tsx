import { memo } from "react";

export type DirectionForFieldProps = {
  directionText: string;
};
function DirectionForFieldElement(props: DirectionForFieldProps) {
  return (
    <div className="direction">
      <p>{props.directionText}</p>
    </div>
  );
}
const DirectionForField = memo(DirectionForFieldElement);
export default DirectionForField;
