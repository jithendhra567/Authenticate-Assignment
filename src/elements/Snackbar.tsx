import React, { useImperativeHandle } from "react";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import { IoMdClose } from "react-icons/io";

const ref = React.createRef<any>();

const Snackbar = () => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarConfig, setSnackbarConfig] = React.useState({
    message: "",
    type: "info",
  });

  const showSnackbarHandler = (
    message = "",
    type = "info",
    duration = 3000
  ) => {
    setShowSnackbar(true);
    setSnackbarConfig({
      message,
      type,
    });

    setTimeout(() => {
      closeSnackbar();
    }, duration);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      showSnackbarHandler,
    }),
    []
  );

  const { type, message } = snackbarConfig;
  const className = `snackbar ${showSnackbar ? "show" : "hide"} ${type}`;

  return (
    <div className={className} ref={ref}>
      <CustomText className="snackbarMessage">{message}</CustomText>
      <CustomButton className="textButton" onClick={closeSnackbar}>
        <IoMdClose size={22} color={type !== "error" ? "red" : "white"} />
      </CustomButton>
    </div>
  );
};

export const showSnackbar = (
  message = "",
  type?: "info" | "error" | "success",
  duration = 3000
) => {
  if (ref.current) ref.current.showSnackbarHandler(message, type, duration);
};

export default Snackbar;
