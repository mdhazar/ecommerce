import api from "../../api/api";
import { setUser } from "../actions/clientActions";
import { toast } from "react-toastify";
import md5 from "md5";

export const loginUser = (data, history, location) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const userInfo = response.data;

      const emailHash = md5(data.email.trim().toLowerCase());
      const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;

      const user = {
        ...userInfo,
        gravatarUrl,
      };

      dispatch(setUser(user));

      if (data.rememberMe) {
        localStorage.setItem("token", userInfo.token);
      }

      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };
};
