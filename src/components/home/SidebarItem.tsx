import React from "react";
import CustomButton from "../../elements/CustomButton";
import { WatchListType } from "../../utils/types";
import CustomText from "../../elements/CustomText";

type Props = {
  title: string;
  id: string;
  onClick: (watchList: string) => void;
  active: boolean;
};

const SidebarItem = ({ title, id, onClick, active }: Props) => {
  return (
    <CustomButton
      key={id}
      className={`textButton sidebarListItem  ${active ? "active" : ""}`}
      onClick={() => onClick(id)}
    >
      <CustomText>{title}</CustomText>
    </CustomButton>
  );
};

export default React.memo(SidebarItem);
