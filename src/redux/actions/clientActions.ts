import { User } from "../types";

export const setUser = (user: User) => ({
  type: "SET_USER",
  payload: user,
});

export const setRoles = (roles: string[]) => ({
  type: "SET_ROLES",
  payload: roles,
});

export const setTheme = (theme: string) => ({
  type: "SET_THEME",
  payload: theme,
});

export const setLanguage = (language: string) => ({
  type: "SET_LANGUAGE",
  payload: language,
});
