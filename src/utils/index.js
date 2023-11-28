import { HOST_DEV, HOST_PROD } from "../constants";

export const getRequestUrl = (path, searchParams) => {
  const host = process.env.NODE_ENV === "development" ? HOST_DEV : HOST_PROD;
  return `${host}/${path}${
    searchParams
      ? `?${Object.entries(searchParams)
          .map((entry) => entry.join("="))
          .join("&")}`
      : ""
  }`;
};

export const headerParams = {
  "Content-Type": "application/json",
  "x-api-key": process.env.REACT_APP_API_KEY,
};
