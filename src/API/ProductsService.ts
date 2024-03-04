import axios from "axios";
import { ApiResponse, IProduct } from "../types/types";

export default class ProductsService {
  private static API: string = process.env.REACT_APP_API || "";

  private static async getIds(
    offset = 0,
    limit = 50,
  ): Promise<string[] | null> {
    try {
      const response = await axios.post<ApiResponse<string[]>>(
        ProductsService.API,
        {
          action: "get_ids",
          params: { offset, limit },
        },
      );

      return response.data.result;
    } catch (e) {
      console.log(e);
    }

    // FIXME:
    return null;
  }

  private static async getItems(ids: string[]): Promise<IProduct[] | null> {
    try {
      const response = await axios.post<ApiResponse<IProduct[]>>(ProductsService.API, {
        action: "get_items",
        params: { ids },
      });

      return response.data.result;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  static async getProducts(
    offset = 0,
    limit = 50,
  ): Promise<IProduct[] | null> {
    const ids = await ProductsService.getIds(offset, limit);
    return ids ? await this.getItems(ids) : null;
  }
}
