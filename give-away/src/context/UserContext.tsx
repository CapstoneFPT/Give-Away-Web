import React, { useState } from "react";

interface User {
  // Define the properties of the user object
  // For example:
  id: number;
  name: string;
}

interface UserContextValue {
  user: User | null;
  login: (userCredentials: User) => void;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userCredentials: User) => {
    setUser(userCredentials);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
