import { ELSProps } from "../../constants/ELSProps";
import { getLSItem } from "../../helpers/localStorage";

export type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const authConfig = async (isFormData: boolean) => {
  const token = await getLSItem(ELSProps.token);

  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return { headers };
};

export const fetchRequest = async <Res, Body extends object = {}>(
  fetchUrl: string,
  method: FetchMethods = "GET",
  body: Body | null = null,
  config?: RequestInit
) => {
  const isFormData = body instanceof FormData;
  config = config || (await authConfig(isFormData));

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
