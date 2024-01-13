import { createContext, useContext, useState, useEffect } from "react";
import userService from "../services/userService";

const fn_error_context_must_be_used = () => {
  throw new Error(
    "Must use authContext provider for consumer nto work properly"
  );
};

export const authContext = createContext({
  logout: fn_error_context_must_be_used,
  login: fn_error_context_must_be_used,
  createUser: fn_error_context_must_be_used,
  user: null,
  favoritesP: null,
  setFavoritesP: fn_error_context_must_be_used,
  getFavProducts: fn_error_context_must_be_used,
});
authContext.displayName = "auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const [favoritesP, setFavoritesP] = useState([]);

  useEffect(() => {
    async function getFavs() {
      const favP = await getFavProducts();
      setFavoritesP(favP);
    }
    getFavs();
  }, []);

  async function getFavProducts() {
    const { data } = await userService.getFavoriteProducts();
    return data;
  }

  const refreshUser = () => setUser(userService.getUser());

  const login = async (credentials) => {
    const response = await userService.loginUser(credentials);

    refreshUser();

    return response;
  };

  const logout = () => {
    userService.logout();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        user,
        createUser: userService.createUser,
        favoritesP,
        setFavoritesP,
        getFavProducts,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export default AuthProvider;
