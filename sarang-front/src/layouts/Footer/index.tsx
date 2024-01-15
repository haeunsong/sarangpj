import React from "react";
import "./style.css";

// 푸터 레이아웃
export default function Footer() {
  // 인스타 아이콘 버튼 클릭 이벤트 처리
  const onInstaIconButtonClickHandler = () => {
    window.open("https://www.instagram.com");
  };

  // 블로그 아이콘 버튼 클릭 이벤트 처리
  const onNaverBlogIconButtonClickHandler = () => {
    window.open("https://blog.naver.com/jamy0225");
  };

  return (
    <div id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-box">
            <div className="icon-box">
              <div className="icon logo-light-icon"></div>
            </div>
            <div className="footer-logo-text">{"Sarang Board"}</div>
          </div>
          <div className="footer-link-box">
            <div className="footer-email-link">{"jamy022576@gmail.com"}</div>
            <div
              className="icon-button"
              onClick={onInstaIconButtonClickHandler}
            >
              <div className="icon insta-icon"></div>
            </div>
            <div
              className="icon-button"
              onClick={onNaverBlogIconButtonClickHandler}
            >
              <div className="icon naver-blog-icon"></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">{"Copyright"}</div>
        </div>
      </div>
    </div>
  );
}
