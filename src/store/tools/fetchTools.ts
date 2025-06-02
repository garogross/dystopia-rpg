import { getLSItem } from "../../helpers/localStorage";
import { lsProps } from "../../utils/lsProps";

export type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const baseUrl = process.env.REACT_APP_BACKEND_URL;
export const baseConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authConfig = async (isFormData?: boolean) => {
  let token = "";
  try {
    token = await getLSItem(lsProps.token);
  } catch (error) {}

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
  config = config || (await authConfig());

  const filteredBody: Partial<Body> = {};

  const isFormData = body instanceof FormData;
  if (body && !isFormData) {
    for (let key in body) {
      if (body[key]) {
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
