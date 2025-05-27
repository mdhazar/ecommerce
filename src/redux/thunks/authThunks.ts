import { setUser } from "../actions/clientActions";
import { toast } from "react-toastify";
import md5 from "md5";
import { LoginData, History, Location, User } from "../types";
import { Dispatch } from "redux";
import api from "../../api/api";

export const loginUser = (
  data: LoginData,
  history: History,
  location: Location
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const userInfo = response.data;

      const emailHash = md5(data.email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;

      const user: User = {
        ...userInfo,
        gravatarUrl,
      };

      dispatch(setUser(user));

      if (userInfo.token) {
        if (data.rememberMe) {
          localStorage.setItem("token", userInfo.token);
        }

        api.defaults.headers.common["Authorization"] = userInfo.token;
      }
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from.pathname);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };
};

export const verifyToken = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        api.defaults.headers.common["Authorization"] = token;

        const response = await api.get("/verify");

        const userInfo = response.data;

        const emailHash = md5(userInfo.email.trim().toLowerCase());
        const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;

        const user: User = {
          ...userInfo,
          gravatarUrl,
        };

        dispatch(setUser(user));

        if (userInfo.token) {
          localStorage.setItem("token", userInfo.token);
          api.defaults.headers.common["Authorization"] = userInfo.token;
        }
      } catch (error) {
        console.error("Token verification failed:", error);

        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];

        dispatch(setUser({} as User));

        toast.error("Session expired. Please log in again.");
      }
    } else {
      console.log("No token found in localStorage.");
    }
  };
};
