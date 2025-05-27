import { ClientState, User } from "../types";

const initialState: ClientState = {
  user: { email: "" } as User,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "tr",
};

type ClientAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_ROLES"; payload: any[] }
  | { type: "SET_THEME"; payload: string }
  | { type: "SET_LANGUAGE"; payload: string };

const clientReducer = (
  state: ClientState = initialState,
  action: ClientAction
): ClientState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ROLES":
      return { ...state, roles: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default clientReducer;
