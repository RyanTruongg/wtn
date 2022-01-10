import { Validator } from "utils/validator";

// export const DEFAULT_BASE_URL = `${process.env.REACT_APP_BACKEND_HOST}/api/v1`;
export const DEFAULT_BASE_URL =
  "https://ont-core-be-dev-7kbmt2m5xa-as.a.run.app/api/v1";

const handleSuccessResponse = async response => {
  try {
    const statusCode = response.status;

    const resData = await response.json();

    if (statusCode === 401 || statusCode === 400 || statusCode === 500) {
      // eslint-disable-next-line no-throw-literal
      throw {
        code: statusCode,
        message: resData,
      };
    }

    return [resData, null];
  } catch (err) {
    return [null, err];
  }
};

const handleErrorResponse = errResponse => {
  return [
    null,
    {
      code: 500,
      message: errResponse,
    },
  ];
};

export default class Fetch {
  static get(route, params = {}, baseUrl = null) {
    return this.xhr(route, params, "GET", baseUrl);
  }

  static put(route, params = {}, baseUrl = null) {
    return this.xhr(route, params, "PUT", baseUrl);
  }

  static post(route, params = {}, baseUrl = null) {
    return this.xhr(route, params, "POST", baseUrl);
  }

  static delete(route, params = {}, baseUrl = null) {
    return this.xhr(route, params, "DELETE", baseUrl);
  }

  static xhr(url, params, verb, baseUrl) {
    if (!baseUrl) {
      baseUrl = DEFAULT_BASE_URL;
    }

    if (!Validator.isValidUrl(url)) {
      url = url.indexOf("/") === 0 ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }

    let options = { method: verb };
    options["headers"] = {
      "Content-Type": "application/json",
    };

    if (window.localStorage["token"]) {
      options["headers"]["Authorization"] = `Bearer ${
        window.localStorage["token"]
      }`;
    }

    if (verb !== "GET") {
      options["body"] = JSON.stringify(params);
    } else {
      if (params) {
        url = `${url}?${Object.keys(params)
          .filter(key => params[key] !== null)
          .map(key => `${key}=${params[key]}`)
          .join("&")}`;
      }
    }

    const retyFunction = fetch(url, options)
      .then(handleSuccessResponse)
      .catch(handleErrorResponse);

    return retyFunction;
  }
}
