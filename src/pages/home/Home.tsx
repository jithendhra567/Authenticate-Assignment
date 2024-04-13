import React from "react";
import SearchMovies from "./SearchMovies";
import CustomText from "../../elements/CustomText";
import Sidebar from "../../components/home/Sidebar";
import { useSearchParams } from "react-router-dom";
import { CONTS } from "../../utils/constants";
import MyList from "./MyLists";

const Home = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const currentWatchList = urlSearchParams.get(CONTS.WATCH_LIST);
  return (
    <div>
      <Sidebar />
      <div>
        {currentWatchList ? (
          <MyList currentWatchList={currentWatchList} />
        ) : (
          <SearchMovies />
        )}
      </div>
    </div>
  );
};

export default Home;
