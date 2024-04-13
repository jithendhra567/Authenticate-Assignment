import React from "react";
import CustomButton from "../../elements/CustomButton";
import { WatchListType } from "../../utils/types";
import CustomText from "../../elements/CustomText";

type Props = {
  item: WatchListType;
  onClick: (watchList: string) => void;
  active: boolean;
};

const SidebarItem = ({ item, onClick, active }: Props) => {
  return (
    <CustomButton
      key={item.id}
      className={`textButton sidebarListItem  ${active ? "active" : ""}`}
      onClick={() => onClick(item.id)}
    >
      <CustomText>{item.title}</CustomText>
    </CustomButton>
  );
};

export default React.memo(SidebarItem);
