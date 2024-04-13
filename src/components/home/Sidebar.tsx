import React from "react";
import useAuth from "../../hooks/useAuth";
import CustomText from "../../elements/CustomText";
import CustomButton from "../../elements/CustomButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const Sidebar = () => {
  const { userWatchList } = useAuth();
  const navigate = useNavigate();

  const [_, setUrlSearchParams] = useSearchParams();

  const onClick = (watchList: string) => {
    setUrlSearchParams({ watchList });
  };

  return (
    <div>
      <CustomText>WatchList</CustomText>

      <CustomButton
        onClick={() => {
          navigate(ROUTES.HOME);
        }}
      >
        <CustomText>Home</CustomText>
      </CustomButton>
      <div>
        {userWatchList.map((item) => (
          <CustomButton key={item} onClick={() => onClick(item)}>
            <CustomText>{item}</CustomText>
          </CustomButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
