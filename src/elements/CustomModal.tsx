import React from "react";

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
    <div className="modal-wrapper" style={containerStyle}>
      <div className="modal-overlay" onClick={() => onClose(false)} />
      <div className="modal" style={modalStyle}>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
