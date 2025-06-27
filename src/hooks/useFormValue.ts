import { UnknownAction } from "@reduxjs/toolkit";
import { ChangeEvent, useState } from "react";

export type FormDataType = { [key in string]: string | string[] | boolean };

export type IError<T extends FormDataType> = {
  [key in keyof T]?: string | null;
};
export type SetErrorType<T extends FormDataType> = (
  payload: IError<T>
) => UnknownAction;
type ErrorProp<T extends FormDataType> = keyof IError<T>;

export const useFormValue = <T extends FormDataType>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [error, setError] = useState<IError<T> | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    clearInputError(e.target.name as ErrorProp<T>);
  };

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/[^0-9+]/g)) {
      e.target.value = e.target.value.replace(/[^0-9+]+/g, "");
    }
    onChange(e);
  };

  const onChangeSelect = <Value>(key: keyof T, value: Value) => {
    setFormData((state) => ({
      ...state,
      [key]: value,
    }));
    clearInputError(key as ErrorProp<T>);
  };

  const clearInputError = (inputName: ErrorProp<T>) => {
    if (
      setError &&
      error &&
      typeof error === "object" &&
      inputName in error &&
      error?.[inputName]
    ) {
      setError({
        ...error,
        [inputName]: null,
      });
    }
  };

  const onResetForm = () => {
    setFormData(initialData);
  };

  const getCurError = (key: keyof T) => {
    return error?.[key];
  };

  return {
    formData,
    onChange,
    onNumberChange,
    onChangeSelect,
    onResetForm,
    setFormData,
    clearInputError,
    error,
    setError,
    getCurError,
  };
};
