import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BOARD_PATH,
  AUTH_PATH,
  BOARD_DETAIL_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
  USER_PATH,
} from "constant";
import { useCookies } from "react-cookie";
import useLoginUserStore from "stores/login-user.store";
import { useBoardStore } from "stores";

// 헤더 레이아웃
export default function Header() {
  // state: 로그인 유저 상태
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

  // state: path 상태
  const { pathname } = useLocation();

  // state: cookie 상태 ($ npm i react-cookie)
  const [cookies, setCookies] = useCookies();

  // state: 로그인 상태
  const [isLogin, setLogin] = useState<boolean>(false);

  const isAuthPage = pathname.startsWith(AUTH_PATH());
  const isMainPage = pathname === MAIN_PATH();
  const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
  const isBoardDetailPage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
  );
  const isBoardWritePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_WRITE_PATH()
  );
  const isBoardUpdatePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_UPDATE_PATH("")
  );
  const isUserPage = pathname.startsWith(USER_PATH(""));

  // function: 네비게이트 함수
  const navigate = useNavigate();

  // event handler: 로고 클릭 이벤트 처리 함수
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  // component: SEARCH 버튼 컴포넌트
  const SearchButton = () => {
    // state: 검색어 버튼 요소 참조 상태
    const searchButtonRef = useRef<HTMLDivElement | null>(null);

    // state: 검색 버튼 상태
    const [status, setStatus] = useState<boolean>(false);

    // state: 검색어 상태
    const [word, setWord] = useState<string>("");

    // state: 검색어 path variable 상태
    // App.tsx 에서 SEARCH_PATH(':searchWord') 해놓은 거랑 변수명 같아야 한다.
    const { searchWord } = useParams();

    // event handler: 검색어 변경 이벤트 처리 함수
    // 검색창에 값을 입력하고 버튼 누르면 그 검색 페이지로 넘어가고,
    // 그 검색어값이 그대로 남아있다.
    const onSearchButtonClickHandler = () => {
      // 기본적으로 항상 실행(status 기본이 false라서)
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    // effect: 검색어 path variable 변경될 때마다 실행될 함수
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);

    // event handler: 검색어 키 이벤트 처리 함수
    const onSearchWordKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return; // 엔터가 아니면 그냥 바로 리턴
      if (!searchButtonRef) return; // 흠... 이건 왜 있는거지?

      // 엔터키가 눌리면 searchButtonRef가 참조하고 있는 것을 바로 click() 하게 만든다.
      // 여기서는 search icon button 이 참조하고 있다.
      searchButtonRef.current?.click();
    };

    // event handler: 검색 버튼 change 이벤트 처리 함수
    const onSearchWordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setWord(e.target.value);
    };
    // render: 검색 버튼 컴포넌트 렌더링 (클릭 false 상태)
    if (!status)
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-light-icon"></div>
        </div>
      );

    // render: 검색 버튼 컴포넌트 렌더링 (클릭 true 상태)
    return (
      <div className="header-search-input-box">
        <input
          className="header-search-input"
          type="text"
          placeholder="검색어를 입력해주세요."
          value={word}
          onChange={onSearchWordChangeHandler}
          onKeyDown={onSearchWordKeyDownHandler}
        />

        <div
          ref={searchButtonRef}
          className="icon-button"
          onClick={onSearchButtonClickHandler}
        >
          <div className="icon search-light-icon"></div>
        </div>
      </div>
    );
  };

  // component: 로그인 또는 마이페이지 버튼 컴포넌트 렌더링
  const MyPageButton = () => {
    // state: userEmail path variable 상태
    const { userEmail } = useParams();

    // event handler: 마이페이지 버튼 클릭 이벤트 처리 함수
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser; // 근데 왜 여기서 loginUser.email 로 하지 않는거지..?!
      navigate(USER_PATH(email));
    };

    // event handler: 로그인 버튼 클릭 이벤트 처리 함수
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    // event handler: 로그아웃 버튼 클릭 이벤트 처리 함수
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    };

    // render: 로그아웃 버튼 컴포넌트 렌더링
    // 로그인 되어있고, 마이페이지 화면이면, 로그아웃 버튼.
    if (isLogin && userEmail === loginUser?.email) {
      return (
        <div className="white-button" onClick={onSignOutButtonClickHandler}>
          {"로그아웃"}
        </div>
      );
    }

    // 로그인 되어있으면 마이페이지 버튼 보이게
    if (isLogin) {
      // render: 마이페이지 버튼 컴포넌트 렌더링
      return (
        <div className="white-button" onClick={onMyPageButtonClickHandler}>
          {"마이페이지"}
        </div>
      );
    }

    // render: 로그인 버튼 컴포넌트 렌더링
    return (
      <div className="black-button" onClick={onSignInButtonClickHandler}>
        {"로그인"}
      </div>
    );
  };

  // component: UPLOAD 버튼 컴포넌트
  const UploadButton = () => {
    // state: 게시물 상태
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    // event handler: 업로드 버튼 클릭 이벤트 처리 함수
    const onUploadButtonClickHandler = () => {};

    // 제목과 내용 모두에 내용이 들어있을 때에만 업로드 버튼 활성화
    if (title && content) return <div className="black-button">{"업로드"}</div>;

    return <div className="disable-button">{"업로드"}</div>;
  };
  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{"Sarang Board"}</div>
        </div>
        <div className="header-right-box">
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && (
            <SearchButton />
          )}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && (
            <MyPageButton />
          )}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
    </div>
  );
}
