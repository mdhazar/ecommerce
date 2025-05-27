export const SET_FILTER_PARAMS = "SET_FILTER_PARAMS";

interface FilterParams {
  filter: string;
  sort: string;
}

export const setFilterParams = (params: FilterParams) => ({
  type: SET_FILTER_PARAMS,
  payload: params,
});
