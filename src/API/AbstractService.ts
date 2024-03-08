import {ApiActionsParams, ApiRequestBody, ApiResponse} from "../types/API";
import axios from "axios";

export abstract class AbstractService {
  private static API: string = process.env.REACT_APP_API || "";

  protected static async apiRequest<T>(
    req: ApiRequestBody<ApiActionsParams>,
  ): Promise<T | null> {
    try {
      const { data } = await axios.post<ApiResponse<T> | null>(
        AbstractService.API,
        req,
      );
      return data ? data.result : null;
    } catch (e: any) {
      console.log(
        `API call failed with status code: ${e.response.status} after 3 retry attempts`,
      );
    }
    return null;
  }
}