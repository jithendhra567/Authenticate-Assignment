import React from "react";
import ReactDOM from "react-dom";

export type CustomModalProps = {
  visible: boolean;
  onClose: (val: boolean) => void;
  children: React.ReactNode;
  containerStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
};

const CustomModal = (props: CustomModalProps) => {
  const { visible, onClose, children, containerStyle, modalStyle } = props;

  if (!visible) {
    return null;
  }

  return (
    <div>
      {ReactDOM.createPortal(
        <div className="modal-wrapper" style={containerStyle}>
          <div className="modal-overlay" onClick={() => onClose(false)} />
          <div className="modal" style={modalStyle}>
            {children}
          </div>
        </div>,
        document.getElementById("portal") as any
      )}
    </div>
  );
};

export default CustomModal;
