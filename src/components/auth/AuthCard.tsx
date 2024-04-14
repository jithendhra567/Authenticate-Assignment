import React, { PropsWithChildren, useMemo } from "react";
import CustomText from "../../elements/CustomText";

const AuthCard = (props: PropsWithChildren<{ isLogin?: boolean }>) => {
  const renderHeader = useMemo(
    () => (
      <>
        <CustomText className="h1" style={{ marginBottom: 20 }}>
          {props.isLogin ? "Watch List" : "Register"}
        </CustomText>
        <div style={{ width: "100%" }}>
          <CustomText className="desc">
            {props.isLogin
              ? "Enter your email to login"
              : "Enter your email to register"}
          </CustomText>
        </div>
      </>
    ),
    []
  );

  return (
    <div className="auth">
      <div className="authCard">
        {renderHeader}
        {props.children}
      </div>
    </div>
  );
};

export default AuthCard;
