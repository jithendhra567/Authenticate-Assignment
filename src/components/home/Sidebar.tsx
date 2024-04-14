import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CustomText from "../../elements/CustomText";
import CustomButton from "../../elements/CustomButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import SidebarItem from "./SidebarItem";
import CustomInput from "../../elements/CustomInput";
import { TbLogout2 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const { userWatchList, logout, toggleSideBar } = useAuth();
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

  const onClick = useCallback((watchList: string) => {
    setUrlSearchParams({ watchList });
    toggleSideBar();
  }, []);

  const navigateToHome = useCallback(() => {
    navigate(ROUTES.HOME);
    toggleSideBar();
  }, []);

  const onLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      logout();
    }
  };

  const renderHeader = useMemo(() => {
    return (
      <>
        <CustomText className="heading">WatchLists</CustomText>
        <CustomButton
          className="close closeSideBar textButton"
          onClick={toggleSideBar}
        >
          <IoMdClose />
        </CustomButton>
        <CustomButton className="textButton logoutBtn" onClick={onLogout}>
          <CustomText className="logout">logout</CustomText>
          <TbLogout2 color="red" size={20} />
        </CustomButton>
      </>
    );
  }, []);

  return (
    <div className="sidebar">
      {renderHeader}
      <SidebarItem
        id={ROUTES.HOME}
        title={"Home"}
        onClick={navigateToHome}
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
            id={item.id}
            title={item.title}
            onClick={onClick}
            active={currentWatchList === item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
