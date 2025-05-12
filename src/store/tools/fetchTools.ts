// import { getLSItem } from "../../helpers/localStorage";
// import { lsProps } from "../../utils/lsProps";

export type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const baseUrl = "https://dystopia.game/api";
export const baseConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authConfig = (isFormData?: boolean) => {
  let token = "";
  // getLSItem(lsProps.token, (token) => {
  //   console.log({ token });
  // });

  const headers: HeadersInit = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return { headers };
};

export const fetchRequest = async <Res, Body extends object = {}>(
  fetchUrl: string,
  method: FetchMethods = "GET",
  body: Body | null = null,
  config = authConfig()
) => {
  const filteredBody: Partial<Body> = {};

  const isFormData = body instanceof FormData;
  if (body && !isFormData) {
    for (let key in body) {
      if (body[key]) {
        filteredBody[key] = body[key];
      }
    }
  }
  console.log("fetchRequest", filteredBody);

  const response = await fetch(`${baseUrl}${fetchUrl}`, {
    method: method,
    body: !body || isFormData ? body : JSON.stringify(filteredBody),
    ...config,
  });
  console.log("response");

  const resData: Res = await response.json();

  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: resData, status: response.status };
  }
  return resData;
};
