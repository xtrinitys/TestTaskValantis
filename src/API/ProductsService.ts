import {
  formFilterRequest,
  formGetIdsRequest,
  formGetItemsRequest,
} from "../types/API";
import { IProduct } from "../types/types";
import AbstractService from "./AbstractService";
import { ProductFilterOptions } from "../components/Product/ProductFilter";

export default class ProductsService extends AbstractService {
  private static async getIds(
    offset = 0,
    limit = 50,
  ): Promise<string[] | null> {
    const req = formGetIdsRequest(offset, limit);
    return await ProductsService.apiRequest(req);
  }

  private static async getItems(ids: string[]): Promise<IProduct[] | null> {
    const req = formGetItemsRequest(ids);
    return await ProductsService.apiRequest(req);
  }

  private static async getFilteredIds(
    field: ProductFilterOptions,
    value: string | number,
  ): Promise<string[] | null> {
    const req = formFilterRequest(field, value);
    return await ProductsService.apiRequest(req);
  }

  static async getProducts(
    offset: number,
    limit: number,
  ): Promise<IProduct[] | null> {
    const ids = await ProductsService.getIds(offset, limit);
    return ids ? await ProductsService.getItems(ids) : null;
  }

  static async getFilteredProducts(
    field: ProductFilterOptions,
    value: string | number,
  ): Promise<IProduct[] | null> {
    const ids = await ProductsService.getFilteredIds(field, value);
    return ids ? await ProductsService.getItems(ids) : null;
  }
}
