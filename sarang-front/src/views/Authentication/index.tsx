import React, { useState } from "react";
import "./style.css";

export default function Authentication() {
  // state: 화면 상태
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");
  // component: sign in card 컴포넌트
  const SignInCard = () => {
    return <div className="auth-card"></div>;
  };
  // component: sign up card 컴포넌트
  const SignUpCard = () => {
    return <div className="auth-card"></div>;
  };
  return (
    <div id="auth-wrapper">
      <div className="auth-container">
        <div className="auth-jumbotron-box">
          <div className="auth-jumbotron-contents">
            <div className="auth-logo-icon"></div>
            <div className="auth-jumbotron-text-box">
              <div className="auth-jumbotron-text">{"환영합니다"}</div>
              <div className="auth-jumbotron-text">{"MANNA 입니다"}</div>
            </div>
          </div>
        </div>
        {view === "sign-in" && <SignInCard />}
        {view === "sign-up" && <SignUpCard />}
      </div>
    </div>
  );
}
