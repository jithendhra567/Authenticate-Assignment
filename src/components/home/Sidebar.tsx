import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CustomText from "../../elements/CustomText";
import CustomButton from "../../elements/CustomButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import SidebarItem from "./SidebarItem";
import CustomInput from "../../elements/CustomInput";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  const { userWatchList, logout } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setUrlSearchParams] = useSearchParams();
  const [watchList, setWatchList] = useState(userWatchList);
  const [searchText, setSearchText] = useState<string>("");

  const currentWatchList = searchParams.get("watchList");

  useEffect(() => {
    updateWatchList();
  }, [userWatchList, searchText]);

  const updateWatchList = () => {
    if (searchText) {
      const list = userWatchList.filter((item) =>
        item.title.includes(searchText)
      );
      setWatchList(list);
    } else setWatchList(userWatchList);
  };

  const onClick = useCallback(
    (watchList: string) => {
      setUrlSearchParams({ watchList });
    },
    [searchParams]
  );

  return (
    <div className="sidebar">
      <CustomText className="heading">WatchLists</CustomText>
      <SidebarItem
        item={{ id: ROUTES.HOME, title: "Home" }}
        onClick={() => {
          navigate(ROUTES.HOME);
        }}
        active={!currentWatchList}
      />
      <CustomText className="h3" style={{ marginTop: 20 }}>
        My List ({watchList.length})
      </CustomText>
      <div className="divider" />
      <CustomInput
        value={searchText}
        style={{ marginBottom: 10 }}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for WatchList"
      />
      <div className="sidebarList">
        {watchList.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            onClick={onClick}
            active={currentWatchList === item.id}
          />
        ))}
      </div>
      <CustomButton className="textButton logoutBtn" onClick={logout}>
        <CustomText className="logout">logout</CustomText>
        <TbLogout2 color="red" size={20} />
      </CustomButton>
    </div>
  );
};

export default Sidebar;
