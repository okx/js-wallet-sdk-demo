import { sha256 } from "js-sha256";

import { HOST_DEV, HOST_PROD, METHOD_POST } from "../constants";

export const getRequestUrl = (path, searchParams) => {
  const host = process.env.NODE_ENV === "development" ? HOST_DEV : HOST_PROD;
  return `${host}${path}${
    searchParams
      ? `?${Object.entries(searchParams)
          .map((entry) => entry.join("="))
          .join("&")}`
      : ""
  }`;
};

export const headerParams = (timestamp, method, url, body = "") => {
  console.log(timestamp, method, url, body);
  const message =
    method === METHOD_POST
      ? timestamp + method + url + body
      : timestamp + method + url;
  // const sha256hmac = sha256.hmac.create(process.env.REACT_APP_SECRET_KEY);
  // const messageHash = sha256hmac.update(message).hex();
  const messageHash = sha256.hmac(process.env.REACT_APP_SECRET_KEY, message);
  // const signature = Buffer.from(messageHash).toString("base64");
  const signature = btoa(messageHash);
  console.log(messageHash, signature);
  return {
    "Content-Type": "application/json",
    "OK-ACCESS-KEY": process.env.REACT_APP_API_KEY,
    "OK-ACCESS-PASSPHRASE": process.env.REACT_APP_PASSPHRASE,
    "OK-ACCESS-PROJECT": process.env.REACT_APP_PROJECT_ID,
    "OK-ACCESS-TIMESTAMP": timestamp,
    "OK-ACCESS-SIGN": signature,
  };
};
