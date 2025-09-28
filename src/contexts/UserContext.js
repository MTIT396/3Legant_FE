import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosClient } from "../utils/axios";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const res = await axiosClient.get("/api/user/me");
      if (!res.data.success) return;
      setUser({
        username: res.data.data.username,
        avatar: res.data.data.avatar,
      });
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  return useContext(UserContext);
};
