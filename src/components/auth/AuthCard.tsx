import React, { PropsWithChildren } from "react";
import CustomText from "../../elements/CustomText";

const AuthCard = (props: PropsWithChildren<{ isLogin?: boolean }>) => {
  return (
    <div className="auth">
      <div className="authCard">
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
        {props.children}
      </div>
    </div>
  );
};

export default AuthCard;
