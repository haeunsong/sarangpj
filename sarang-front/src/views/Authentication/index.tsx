import React, { useState, KeyboardEvent, useRef, ChangeEvent } from "react";
import "./style.css";
import InputBox from "components/InputBox";
import { SignInRequestDto } from "apis/request/auth";
import { signInRequest } from "apis";
import { SignInResponseDto } from "apis/response/auth";
import { ResponseDto } from "apis/response";
import { useCookies } from "react-cookie";
import { MAIN_PATH } from "constant";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  // state: 화면 상태
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  // state: 쿠키 상태
  const [cookies, setCookie] = useCookies();

  // function: 네비게이트 함수
  const navigator = useNavigate();

  // component: sign in card 컴포넌트
  const SignInCard = () => {
    // 포커스 설정 위해 참조 상태 사용
    // state: 이메일 요소 참조 상태
    const emailRef = useRef<HTMLInputElement | null>(null);
    // state: 패스워드 요소 참조 상태
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // state: 이메일 상태
    const [email, setEmail] = useState<string>("");

    // state: 패스워드 상태
    const [password, setPassword] = useState<string>("");
    //state: 패스워트 타입 상태
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );
    // state: 패스워드 버튼 아이콘 상태
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");
    // state: 에러 상태
    const [error, setError] = useState<boolean>(false);

    // function: sign in response 처리 함수
    // null인 경우는 백엔드가 안켜졌거나 이런 경우
    const signInResponse = (
      responseBody: SignInResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      }
      const { code } = responseBody;

      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code === "VF" || code === "SF") setError(true);
      if (code !== "SU") return;

      const { token, expirationTime } = responseBody as SignInResponseDto;

      // 쿠키에 넣어주는 작업
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      setCookie("accessToken", token, { expires, path: MAIN_PATH() });
      navigator(MAIN_PATH());
    };
    // event handler: 이메일 변경 이벤트 처리
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    };
    // event handler: 비밀번호 변경 이벤트 처리
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    };

    // event handler: 로그인 버튼 클릭 이벤트 처리
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };

    // event handler: 회원가입 링크 클릭 이벤트 처리
    const onSignUpLinkClickHandler = () => {
      setView("sign-up");
    };

    // event handler: 패스워드 버튼 클릭 이벤트 처리
    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };
    // event handler: 이메일 인풋 키 다운 이벤트 처리
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };
    // event handler: 패스워드 인풋 키 다운 이벤트 처리
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      // 엔터하면 로그인 이벤트 발생하도록
    };

    // render: sign in card 컴포넌트 렌더링
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{"로그인"}</div>
            </div>
            <InputBox
              // InputBox에서 forwardRef로 만들었기 때문에 지정가능하다.
              ref={emailRef}
              label="이메일 주소"
              type="text"
              placeholder="이메일 주소를 입력해주세요."
              error={error}
              value={email}
              onChange={onEmailChangeHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              ref={passwordRef}
              label="패스워드"
              type={passwordType}
              placeholder="비밀번호를 입력해주세요."
              error={error}
              value={password}
              onChange={onPasswordChangeHandler}
              icon={passwordButtonIcon}
              onButtonClick={onPasswordButtonClickHandler}
              onKeyDown={onPasswordKeyDownHandler}
            />
          </div>
          <div className="auth-card-bottom">
            {error && (
              <div className="auth-sign-in-error-box">
                <div className="auth-sign-in-error-message">
                  {
                    "이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
                  }
                </div>
              </div>
            )}

            <div
              className="black-large-full-button"
              onClick={onSignInButtonClickHandler}
            >
              {"로그인"}
            </div>
            <div className="auth-description-box">
              <div className="auth-description">
                {"신규 사용자이신가요? "}
                <span
                  className="auth-description-link"
                  onClick={onSignUpLinkClickHandler}
                >
                  {"회원가입"}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // component: sign up card 컴포넌트
  const SignUpCard = () => {
    // state: 이메일 요소 참조 상태
    const emailRef = useRef<HTMLInputElement | null>(null);
    // state: 패스워드 요소 참조 상태
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // state: 패스워드 확인 요소 참조 상태
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);

    // state: 페이지 번호 상태
    const [page, setPage] = useState<1 | 2>(1);
    // state: 이메일 상태
    const [email, setEmail] = useState<string>("");
    // state: 패스워드 상태
    const [password, setPassword] = useState<string>("");
    // state: 패스워드 확인 상태
    const [passwordCheck, setPasswordCheck] = useState<string>("");

    // state: 패스워드 타입 상태
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );
    // state: 패스워드 확인 타입 상태
    const [passwordCheckType, setPasswordCheckType] = useState<
      "text" | "password"
    >("password");
    // state: 이메일 에러 상태
    const [isEmailError, setEmailError] = useState<boolean>(false);
    // state: 패스워드 에러 상태
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    // state: 패스워드 확인 에러 상태
    const [isPasswordCheckError, setPasswordCheckError] =
      useState<boolean>(false);
    // state: 이메일 에러 메시지 상태
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    // state: 패스워드 에러 메시지 상태
    const [passwordErrorMessage, setPasswordErrorMessage] =
      useState<string>("");
    // state: 패스워드 확인 에러 메시지 상태
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
      useState<string>("");

    // state: 패스워드 버튼 아이콘 상태
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");

    // state: 패스워드 확인 버튼 아이콘 상태
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");

    // event handler: 로그인 링크 클릭 이벤트 처리
    const SignInLinkClickHandler = () => {
      setView("sign-in");
    };
    // event handler: 이메일 변경 이벤트 처리
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmail(value);
    };
    // event handler: 패스워드 변경 이벤트 처리
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPassword(value);
    };
    // event handler: 패스워드 확인 변경 이벤트 처리
    const onPasswordCheckChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;
      setPasswordCheck(value);
    };
    // event handler: 패스워드 아이콘 버튼 클릭 이벤트 처리
    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };
    // event handler: 패스워드 확인 아이콘 버튼 클릭 이벤트 처리
    const onPasswordCheckButtonClickHandler = () => {
      if (passwordCheckType === "text") {
        setPasswordCheckType("password");
        setPasswordCheckButtonIcon("eye-light-off-icon");
      } else {
        setPasswordCheckType("text");
        setPasswordCheckButtonIcon("eye-light-on-icon");
      }
    };
    // event handler: 다음 버튼 클릭 이벤트 처리
    const onNextButtonClickHandler = () => {
      const emailPattern =
        /^[a-zA-zx0-9]*@([-.]?[a-zA-Z0-9])* \.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!email) {
        setEmailError(true);
        setEmailErrorMessage("이메일 주소 포맷이 맞지 않습니다.");
      }
      const isCheckedPassword = password.trim().length > 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage("비밀번호는 8자 이상 입력해주세요");
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다.");
      }
      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;
      setPage(2);
    };
    // event handler: 이메일 인풋 키 다운 이벤트 처리
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      // 존재하면
      passwordRef.current.focus();
    };
    // event handler: 패스워드 인풋 키 다운 이벤트 처리
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      // 엔터가 눌리지 않으면 바로 종료시킴.
      if (event.key !== "Enter") return;
      // 비밀번호 입력란이 존재하지 않을 경우 바로 종료시킴.
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };
    // event handler: 패스워드 확인인풋 키 다운 이벤트 처리
    const onPasswordCheckKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!passwordCheckRef.current) return;
      onNextButtonClickHandler();
    };
    // render: sign up card 컴포넌트 렌더링
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{"회원가입"}</div>
              <div className="auth-card-page">{`${page}/2`}</div>
            </div>
            <InputBox
              ref={emailRef}
              onKeyDown={onEmailKeyDownHandler}
              label="이메일 주소*"
              type="text"
              placeholder="이메일 주소를 입력해주세요."
              value={email}
              onChange={onEmailChangeHandler}
              error={isEmailError}
              message={emailErrorMessage}
            />
            <InputBox
              icon={passwordButtonIcon}
              onKeyDown={onPasswordKeyDownHandler}
              onButtonClick={onPasswordButtonClickHandler}
              ref={passwordRef}
              label="비밀번호*"
              type={passwordType}
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onPasswordChangeHandler}
              error={isPasswordError}
              message={passwordErrorMessage}
            />
            <InputBox
              icon={passwordCheckButtonIcon}
              onKeyDown={onPasswordCheckKeyDownHandler}
              onButtonClick={onPasswordCheckButtonClickHandler}
              ref={passwordCheckRef}
              label="비밀번호 학인*"
              type={passwordCheckType}
              placeholder="비밀번호를 다시 입력해주세요."
              value={passwordCheck}
              onChange={onPasswordCheckChangeHandler}
              error={isPasswordCheckError}
              message={passwordCheckErrorMessage}
            />
          </div>
          <div className="auth-card-bottom">
            <div
              className="black-large-full-button"
              onClick={onNextButtonClickHandler}
            >
              {"다음 단계"}
            </div>
            <div className="auth-description-box">
              <div className="auth-description">
                {"이미 계정이 있으신가요? "}
                <span
                  className="auth-description-link"
                  onClick={SignInLinkClickHandler}
                >
                  {"로그인"}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
