import axios from "axios";
import { getDateString, hashText } from "./utils";
import axiosRetry from "axios-retry";

function generateToken(): string {
  const API_PASS: string = process.env.REACT_APP_PASSWORD || "";
  const date = getDateString(new Date());

  return hashText(`${API_PASS}_${date}`);
}

export function setupAxios() {
  // Add auth header
  axios.defaults.headers.post["X-Auth"] = generateToken();

  // Set axios-retry
  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
      return retryCount * 2000;
    },
    onRetry: (retryCount, error) => {
      console.log(
        `status: ${error.response?.status}; retry attempt: ${retryCount}`,
      );
    },
  });
}
