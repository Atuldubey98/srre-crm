import { ChangeEventHandler, useState } from "react";

export default function useFieldChange<T>(defaultValue: T) {
  const [state, setState] = useState<T>(defaultValue);
  const onChangeField: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    setState({
      ...state,
      [name]: value,
    });
  };
  const onSetField = (newState: T) => {
    setState(newState);
  };
  return { state, onChangeField, onSetField };
}
