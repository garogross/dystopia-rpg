export type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const baseUrl = "/api";
export const baseConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchRequest = async <Res, Body extends object = {}>(
  fetchUrl: string,
  method: FetchMethods = "GET",
  body: Body | null = null,
  config = baseConfig
) => {
  const response = await fetch(`${baseUrl}${fetchUrl}`, {
    method: method,
    body: body && JSON.stringify(body),
    ...config,
  });
  if (response.status === 204) return { status: "Success" };
  const resData: Res = await response.json();

  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: resData, status: response.status };
  }
  return resData;
};
