import React, { useImperativeHandle } from "react";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

const ref = React.createRef<any>();

const Snackbar = () => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const showSnackbarHandler = (
    message = "",
    type = "info",
    duration = 3000
  ) => {
    setShowSnackbar(true);
    setSnackbarMessage(message);

    setTimeout(() => {
      setShowSnackbar(false);
    }, duration);
  };

  useImperativeHandle(
    ref,
    () => ({
      showSnackbarHandler,
    }),
    []
  );

  return (
    <div className={`snackbar ${showSnackbar ? "show" : "hide"}`} ref={ref}>
      <CustomText>{snackbarMessage}</CustomText>
      <CustomButton
        onClick={() => {
          setShowSnackbar(true);
          setSnackbarMessage("Snackbar message");
        }}
      >
        Close
      </CustomButton>
    </div>
  );
};

export const showSnackbar = (message = "", type = "info", duration = 3000) => {
  if (ref.current) ref.current.showSnackbarHandler(message, type, duration);
};

export default Snackbar;
