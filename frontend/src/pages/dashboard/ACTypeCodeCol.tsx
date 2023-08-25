import './ACTypeCodeCol.css'
export type ACTypeCodeColProps = {
  value: string;
};
export function ACTypeCodeCol(props: ACTypeCodeColProps) {
  const { value } = props;
  const onCopyClickBoaredData = () => {
    navigator.clipboard.writeText(value);
  };
  return (
    <td className='ac__typeCode' onClick={onCopyClickBoaredData} title="Click to copy code" colSpan={4}>
      <code>{value}</code>
    </td>
  );
}
