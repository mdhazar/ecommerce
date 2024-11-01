import { setRoles } from "../actions/clientActions";

const fetchRolesFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["admin", "user", "guest"]);
    }, 1000);
  });
};

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;

    if (roles.length === 0) {
      try {
        const rolesData = await fetchRolesFromAPI();
        dispatch(setRoles(rolesData));
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    } else {
      console.log("Roles already fetched; skipping API call.");
    }
  };
};
