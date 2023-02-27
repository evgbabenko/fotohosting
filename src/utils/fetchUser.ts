import { User } from "../../typings";

export const fetchUser = () => {
  const userInfo: User | any | null =
    localStorage.getItem('user') !== undefined || null
      ? JSON.parse(localStorage.getItem('user') as any)
      : localStorage.clear();
  
  return userInfo;
}