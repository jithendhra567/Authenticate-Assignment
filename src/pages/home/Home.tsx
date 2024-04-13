import React from "react";
import SearchMovies from "./SearchMovies";
import CustomText from "../../elements/CustomText";
import Sidebar from "../../components/home/Sidebar";
import { useSearchParams } from "react-router-dom";
import { CONTS } from "../../utils/constants";
import MyList from "./MyLists";
import CustomButton from "../../elements/CustomButton";
import useAuth from "../../hooks/useAuth";
import "./home.css";

const Home = () => {
  const { logout } = useAuth();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const currentWatchList = urlSearchParams.get(CONTS.WATCH_LIST);
  return (
    <div className="home">
      <Sidebar />
      {currentWatchList ? (
        <MyList currentWatchList={currentWatchList} />
      ) : (
        <SearchMovies />
      )}
      {/* <CustomButton onClick={logout}>Logout</CustomButton> */}
    </div>
  );
};

export default Home;
