import React, { useMemo, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserDetailsType } from "../../utils/types";
import CustomInput from "../../elements/CustomInput";
import { getItem, setItem } from "../../utils/common";
import CustomButton from "../../elements/CustomButton";
import { showSnackbar } from "../../elements/Snackbar";

type Props = {
  selectionHandler: (value: string) => void;
};

const WatchListSelection = ({ selectionHandler }: Props) => {
  const { user } = useAuth();

  const { userWatchList } = useMemo(() => {
    const details = (getItem(user) as UserDetailsType) || {};
    return { userWatchList: details?.watchList || [] };
  }, []);

  const originalWatchList = useRef(userWatchList);

  const [filteredWatchList, setFilteredWatchList] = useState<string[]>(
    originalWatchList.current
  );
  const [searchText, setSearchText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const list = originalWatchList.current.filter((item) =>
      item.toLowerCase().includes(value)
    );
    setSearchText(value);
    setFilteredWatchList(list);
  };

  const createWatchList = () => {
    if (userWatchList.includes(searchText)) {
      showSnackbar("Watchlist already exists");
      return;
    }

    if (user) {
      const details = (getItem(user) as UserDetailsType) || {};
      originalWatchList.current.unshift(searchText);
      setItem(user, {
        ...details,
        watchList: originalWatchList.current,
      });
      setFilteredWatchList(originalWatchList.current);
      setSearchText("");
    }
  };

  const onSelectWatchList = (name: string) => {
    selectionHandler(name);
  };

  return (
    <div>
      <CustomInput
        value={searchText}
        placeholder="Search Or Create Watchlist"
        onChange={onChange}
      />

      {filteredWatchList.length === 0 && (
        <CustomButton onClick={createWatchList}>Create Watchlist</CustomButton>
      )}

      <div>
        {filteredWatchList.map((item) => (
          <CustomButton key={item} onClick={() => onSelectWatchList(item)}>
            {item}
          </CustomButton>
        ))}
      </div>
    </div>
  );
};

export default WatchListSelection;
