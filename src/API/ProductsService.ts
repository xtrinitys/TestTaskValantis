import axios from "axios";
import { ApiResponse, IProduct } from "../types/types";

export default class ProductsService {
  private static API: string = process.env.REACT_APP_API || "";

  private static async getIds(offset = 0, limit = 50): Promise<string[]> {
    const response = await axios.post<ApiResponse<string[]>>(
      ProductsService.API,
      {
        action: "get_ids",
        params: { offset, limit },
      },
    );

    return response.data.result;
  }

  private static async getItems(ids: string[]): Promise<IProduct[]> {
    const response = await axios.post<ApiResponse<IProduct[]>>(
      ProductsService.API,
      {
        action: "get_items",
        params: { ids },
      },
    );

    return response.data.result;
  }

  static async getProducts(offset = 0, limit = 50): Promise<IProduct[] | null> {
    try {
      const ids = await ProductsService.getIds(offset, limit);
      return await this.getItems(ids);
    } catch (e: any) {
      if (e.response.status !== 200) {
        console.log(
          `API call failed with status code: ${e.response.status} after 3 retry attempts`,
        );
      }
    }
    return null;
  }
}
