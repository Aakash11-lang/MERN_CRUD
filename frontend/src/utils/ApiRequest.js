import axios from "axios";

const REQUEST_URL = "http://localhost:3001/api/users";

export const ApiRequest = async (paramsData) => {
  try {
    const url = paramsData.url;
    const method = paramsData.method;
    const payload = paramsData.data
      ? paramsData.data
      : paramsData.payload
      ? paramsData.payload
      : paramsData.body
      ? paramsData.body
      : null;
    let response;
    const headers = {
      "Content-Type": "application/json",
    };
    const reqMethod = String(method).toLowerCase();
    if (reqMethod === "get") {
      response = await axios.get(REQUEST_URL + url, { headers });
    } else if (reqMethod === "post") {
      response = await axios.post(REQUEST_URL + url, payload);
    } else if (reqMethod === "put") {
      response = await axios.put(REQUEST_URL + url, payload);
    } else if (reqMethod === "delete") {
      response = await axios.delete(REQUEST_URL + url);
    } else {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    console.error(`API Request error:`, error);
    throw error?.response?.data || error.message;
  }
};
