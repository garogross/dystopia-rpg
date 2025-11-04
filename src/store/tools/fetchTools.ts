import { ELSProps } from "../../constants/ELSProps";
import { getLSItem } from "../../helpers/localStorage";

export type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const authConfig = async (
  isFormData: boolean,
  headersArg?: HeadersInit
) => {
  const token = await getLSItem(ELSProps.token);

  // Use a Headers instance so we can safely call .set(...) regardless of the incoming HeadersInit shape
  const headersInstance = new Headers(headersArg);

  if (token) {
    headersInstance.set("Authorization", `Bearer ${token}`);
  }
  if (!isFormData) {
    headersInstance.set("Content-Type", "application/json");
  }
  return { headers: headersInstance };
};

export const fetchRequest = async <Res, Body extends object = {}>(
  fetchUrl: string,
  method: FetchMethods = "GET",
  body: Body | null = null,
  config?: RequestInit,
  headers?: HeadersInit
) => {
  const isFormData = body instanceof FormData;
  config = config || (await authConfig(isFormData, headers));

  const filteredBody: Partial<Body> = {};

  if (body && !isFormData) {
    for (let key in body) {
      if (body[key] || body[key] === 0) {
        filteredBody[key] = body[key];
      }
    }
  }

  const response = await fetch(`${baseUrl}${fetchUrl}`, {
    method: method,
    body: !body || isFormData ? body : JSON.stringify(filteredBody),

    ...config,
  });

  const resData: Res = await response.json();

  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: resData, status: response.status };
  }
  return resData;
};
