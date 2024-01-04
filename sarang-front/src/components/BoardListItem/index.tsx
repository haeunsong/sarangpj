import React from "react";
import "./style.css";
//                  component: Board List Item 컴포넌트                     //
export default function index() {
  //              render: Board List Item 컴포넌트 렌더링             //
  return (
    <div className="board-list-item">
      <div className="board-list-item-main-box">
        <div className="board-list-item-top">
          <div className="board-list-item-profile-box">
            <div
              className="board-list-item-profile-image"
              style={{
                backgroundImage: `url(https://cdn.imweb.me/upload/S20170119587fc1996d25a/5a540781d256c.gif)`,
              }}
            ></div>
          </div>
          <div className="board-list-item-write-box">
            <div className="board-list-item-nickname">
              {"안녕하세요나는주코야키"}
            </div>
            <div className="board-list-item-write-date">{"2022.05.12"}</div>
          </div>
        </div>
        <div className="board-list-item-middle">
          <div className="board-list-item-title">
            {
              "오늘 점심 뭐먹지 맛있는거 먹고 싶은데 추천 부탁 오늘 점심 머먹지 맛있는거 먹고파!!!!!"
            }
          </div>
          <div className="board-list-item-content">
            {
              "오늘 점심 뭐먹지 너무 고민이 되는데 뭐 먹을까?나 점심때 뭐 먹을지 너무너무너무넘 고민이 된다구!!!!아아아앙아"
            }
          </div>
        </div>
        <div className="board-list-item-bottom">
          <div className="board-list-item-counts">
            {`댓글 0 • 좋아요 0 • 조회수 0`}
          </div>
        </div>
      </div>
      <div className="board-list-item-image-box">
        <div
          className="board-list-item-image"
          style={{
            backgroundImage: `url(https://cdn.imweb.me/upload/S20170119587fc1996d25a/5a540781d256c.gif)`,
          }}
        ></div>
      </div>
    </div>
  );
}
