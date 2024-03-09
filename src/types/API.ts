import {isNumeric} from "../utils/utils";

export interface ApiResponse<T> {
  result: T;
}

enum ApiAction {
  GET_IDS = "get_ids",
  GET_ITEMS = "get_items",
  GET_FIELDS = "get_fields",
  FILTER = "filter",
}

export interface ApiRequestBody<T> {
  action: ApiAction;
  params: T;
}

interface GetIdsParams {
  offset: number;
  limit: number;
}

interface GetItemsParams {
  ids: string[];
}

interface GetFieldsParams {
  field: string;
  offset: number;
  limit: number;
}

interface FilterParams {
  [key: string]: string | number;
}

export type ApiActionsParams =
  | GetIdsParams
  | GetItemsParams
  | GetFieldsParams
  | FilterParams;

export const formGetIdsRequest = (
  offset: number,
  limit: number,
): ApiRequestBody<GetIdsParams> => ({
  action: ApiAction.GET_IDS,
  params: { offset, limit },
});

export const formGetItemsRequest = (
  ids: string[],
): ApiRequestBody<GetItemsParams> => ({
  action: ApiAction.GET_ITEMS,
  params: { ids },
});

export const formGetFieldsRequest = (
  field: string,
  offset: number,
  limit: number,
): ApiRequestBody<GetFieldsParams> => ({
  action: ApiAction.GET_FIELDS,
  params: { field, offset, limit },
});

export const formFilterRequest = (
  field: string,
  value: string | number,
): ApiRequestBody<FilterParams> => ({
  action: ApiAction.FILTER,
  params: { [field]: isNumeric(value) ? parseFloat(value as string) : value},
});
