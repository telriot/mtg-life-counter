import { TUser } from "../types/index";
export const getUserNumber = (username?: string, users?: Array<TUser>) => {
  if (!users || !username) return 0;
  return users.findIndex((user) => username === user.username);
};
