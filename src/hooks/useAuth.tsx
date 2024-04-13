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
import { showSnackbar } from "../elements/Snackbar";

type AuthContextType = {
  user?: string;
  login: (data: string) => void;
  logout: () => void;
  isMobile: boolean;
  userWatchList: string[];
  setUserWatchList: (list: string[]) => void;
  registerUser: (email: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isMobile: false,
  userWatchList: [],
  setUserWatchList: () => {},
  registerUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage(LOCAL_STORAGE.currentUser, "");
  const [registeredUsers, setRegisteredUsers] = useLocalStorage<string[]>(
    LOCAL_STORAGE.users,
    []
  );
  const [userWatchList, setUserWatchList] = useState(() => {
    const details = (getItem(user) as UserDetailsType) || {};
    return details?.watchList || [];
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // const [isLoading, setIsLoading] = useState(true); -> this is required if we are getting userdetails from an API

  console.log({ registeredUsers });

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
    const isAlreadyRegistered = registeredUsers.includes(email);
    if (isAlreadyRegistered) {
      setUser(email);
      navigate(ROUTES.HOME);
    } else {
      showSnackbar("User not found, please register", "error", 5000);
      navigate(ROUTES.REGISTER + "?email=" + email);
    }
  };

  const registerUser = (email: string) => {
    const isAlreadyRegistered = registeredUsers.includes(email);
    if (!isAlreadyRegistered) {
      setRegisteredUsers([...registeredUsers, email]);
      setUser(email);
      navigate(ROUTES.HOME);
    } else {
      showSnackbar("User already exists", "error", 5000);
    }
  };

  const logout = () => {
    setUser("");
    navigate(ROUTES.ROOT);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isMobile,
      userWatchList,
      setUserWatchList,
      registerUser,
    }),
    [user, isMobile, userWatchList, registeredUsers]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
