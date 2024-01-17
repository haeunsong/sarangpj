import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { MAIN_PATH, SEARCH_PATH } from "constant";

// 헤더 레이아웃
export default function Header() {
  // function: 네비게이트 함수
  const navigate = useNavigate();

  // event handler: 로고 클릭 이벤트 처리 함수
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  // component: 검색 버튼 컴포넌트
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
    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    // effect: 검색어 path variable 변경될 때마다 실행될 함수
    // 검색어를 입력하고 엔터했을 때 넘어가는 화면에서도 검색창에 검색어가 떠있도록 하기 위해서
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

    // event handler: 검색 버튼 클릭 이벤트 처리 함수
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
          <SearchButton />
        </div>
      </div>
    </div>
  );
}
