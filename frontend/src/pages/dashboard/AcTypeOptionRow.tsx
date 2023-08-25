import { ACTypeCodeCol } from "./ACTypeCodeCol";

export function AcTypeOptionRow(typeOfAC: { value: string; field: string }) {
  return (
    <tr>
      <ACTypeCodeCol value={typeOfAC.value} />
      <td colSpan={8}>
        <code>{typeOfAC.field}</code>
      </td>
    </tr>
  );
}

