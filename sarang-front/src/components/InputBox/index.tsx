import React, { ChangeEvent, forwardRef, KeyboardEvent } from "react";
import "./style.css";

interface Props {
  label: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;

  icon?: "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon";
  onButtonClick?: () => void;

  message?: string;

  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

//
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, type, placeholder, value, error, icon, message } = props;
  const { onChange, onButtonClick, onKeyDown } = props;

  /*onKeyDownHandler 함수는 입력 상자에서 키보드 이벤트가 발생했을 때, 
  부모 컴포넌트에서 추가적인 동작을 수행할 수 있도록 onKeyDown 콜백 함수를 호출합니다. 
  단, 이 콜백 함수가 부모 컴포넌트에서 전달되지 않은 경우에는 아무런 동작도 하지 않습니다.
  */
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

  // render: Input Box 컴포넌트
  return (
    <div className="inputbox">
      <div className="inputbox-label">{label}</div>
      <div className="inputbox-container">
        <input
          // ref: 엔터치면 다른 칸으로 넘어가고 그런거 - 키보드에 대한 동작 처리
          ref={ref}
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDownHandler}
        />
        {/* 아이콘 버튼을 렌더링 하는 조건이다. 
        onButtonClick 함수가 '정의'되어있을 때만 이 부분의 코드를 실행한다.
        onButtonClick 함수가 없으면 아이콘 버튼을 클릭해도 아무런 동작을 안한다.
        */}
        {onButtonClick !== undefined && (
          <div className="icon-button" onClick={onButtonClick}>
            {/* icon이 정의되어 있을 때만 이 코드가 실행된다. */}
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
          </div>
        )}
      </div>

      {message !== undefined && (
        <div className="inputbox-message">{message}</div>
      )}
    </div>
  );
});

export default InputBox;
