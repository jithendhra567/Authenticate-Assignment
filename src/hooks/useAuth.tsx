import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { LOCAL_STORAGE, ROUTES } from "../utils/constants";
import { getItem } from "../utils/common";
import { UserDetailsType } from "../utils/types";

type AuthContextType = {
  user?: string;
  login: (data: string) => void;
  logout: () => void;
  isMobile: boolean;
  userWatchList: string[];
  setUserWatchList: (list: string[]) => void;
};

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isMobile: false,
  userWatchList: [],
  setUserWatchList: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage(LOCAL_STORAGE.currentUser, "");
  const [userWatchList, setUserWatchList] = useState(() => {
    const details = (getItem(user) as UserDetailsType) || {};
    return details?.watchList || [];
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const [isLoading, setIsLoading] = useState(true); -> this is required if we are getting userdetails from an API

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      const details = (getItem(user) as UserDetailsType) || {};
      setUserWatchList(details?.watchList || []);
    }
  }, [user]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const navigate = useNavigate();

  const login = async (email: string) => {
    setUser(email);
    navigate(ROUTES.HOME);
  };

  const logout = () => {
    setUser("");
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isMobile,
      userWatchList,
      setUserWatchList,
    }),
    [user, isMobile, userWatchList]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
