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
import { getItem, setItem } from "../utils/common";
import { UserDetailsType, WatchListType } from "../utils/types";
import { showSnackbar } from "../elements/Snackbar";

type AuthContextType = {
  user?: string;
  login: (data: string) => void;
  logout: () => void;
  userWatchList: WatchListType[];
  updateUserWatchList: (list: WatchListType[]) => void;
  registerUser: (email: string) => void;
  toggleSideBar: () => void;
};

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  userWatchList: [],
  updateUserWatchList: () => {},
  registerUser: () => {},
  toggleSideBar: () => {},
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

  useEffect(() => {
    if (user) {
      const details = (getItem(user) as UserDetailsType) || {};
      setUserWatchList(details?.watchList || []);
    }
  }, [user]);

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

  const toggleSideBar = () => {
    const sidebar = document.querySelector(".sidebar");
    const canToggle = window.innerWidth <= 1150;
    if (sidebar && canToggle) {
      sidebar.classList.toggle("active");
    }
  };

  const logout = () => {
    setUser("");
    navigate(ROUTES.ROOT);
  };

  const updateUserWatchList = (list: WatchListType[]) => {
    const details = (getItem(user) as UserDetailsType) || {};
    details.watchList = list;
    setItem(user, details);
    setUserWatchList(list);
  };

  const value = {
    user,
    login,
    logout,
    userWatchList,
    updateUserWatchList,
    registerUser,
    toggleSideBar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
