export type DirectionForFieldProps = {
  directionText: string;
};
export default function DirectionForField(props: DirectionForFieldProps) {
  return (
    <div className="direction">
      <p>{props.directionText}</p>
    </div>
  );
}
