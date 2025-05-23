import { SET_FILTER_PARAMS } from "../actions/filterActions";

const initialState = {
  filter: "",
  sort: "",
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_PARAMS:
      return {
        ...state,
        filter: action.payload.filter,
        sort: action.payload.sort,
      };
    default:
      return state;
  }
};

export default filterReducer;
