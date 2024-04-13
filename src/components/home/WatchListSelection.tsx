import React, { useMemo, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserDetailsType, WatchListType } from "../../utils/types";
import CustomInput from "../../elements/CustomInput";
import { generateId, getItem, setItem } from "../../utils/common";
import CustomButton from "../../elements/CustomButton";
import { showSnackbar } from "../../elements/Snackbar";
import { MdDelete } from "react-icons/md";
import CustomText from "../../elements/CustomText";

type Props = {
  selectionHandler: (value: string) => void;
};

const WatchListSelection = ({ selectionHandler }: Props) => {
  const { user, userWatchList, updateUserWatchList } = useAuth();

  const originalWatchList = useRef(userWatchList);

  const [filteredWatchList, setFilteredWatchList] = useState<WatchListType[]>(
    originalWatchList.current
  );
  const [searchText, setSearchText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const list = originalWatchList.current.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setSearchText(value);
    setFilteredWatchList(list);
  };

  const createWatchList = () => {
    if (searchText.length === 0) {
      showSnackbar("Please enter watchlist name");
      return;
    }
    const isAlredyWatchlisted = userWatchList.find(
      (item) => item.id.toLocaleLowerCase() === searchText
    );
    if (isAlredyWatchlisted) {
      showSnackbar("Watchlist already exists");
      return;
    }

    if (user) {
      originalWatchList.current.unshift({
        id: generateId(),
        title: searchText,
      });
      updateUserWatchList([...originalWatchList.current]);
      setFilteredWatchList([...originalWatchList.current]);
      setSearchText("");
    }
  };

  const deleteWatchList = (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      const updatedData = originalWatchList.current.filter(
        (item) => item.id !== id
      );
      originalWatchList.current = updatedData;
      updateUserWatchList(updatedData);
      setFilteredWatchList(updatedData);
    }
  };

  const onSelectWatchList = (id: string) => {
    selectionHandler(id);
  };

  return (
    <div className="watchListSelection">
      <CustomText className="h2" style={{ marginBottom: 10 }}>
        WatchList
      </CustomText>
      <CustomInput
        value={searchText}
        autoFocus
        placeholder="Search or Create Watchlist"
        style={{ marginBottom: 20 }}
        onChange={onChange}
      />

      <div className="watchListContainer">
        {filteredWatchList.map((item) => (
          <CustomButton
            className="textButton watchList"
            key={item.id}
            onClick={() => onSelectWatchList(item.id)}
          >
            {item.title}
            <MdDelete
              color="red"
              size={20}
              onClick={(e) => deleteWatchList(e, item.id)}
            />
          </CustomButton>
        ))}
      </div>

      {searchText.length > 0 && (
        <CustomButton
          style={{ width: "100%", marginTop: 20 }}
          onClick={createWatchList}
        >
          Create Watchlist
        </CustomButton>
      )}
    </div>
  );
};

export default WatchListSelection;
