import React, { ChangeEvent, Dispatch, forwardRef, KeyboardEvent } from "react";
import "./style.css";

interface Props {
  label: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  error: boolean;

  icon?: string;
  onButtonClick?: () => void;

  message?: string;

  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

//
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, type, placeholder, value, error, icon, message } = props;
  const { setValue, onButtonClick, onKeyDown } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

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
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        {onButtonClick !== undefined && (
          <div className="icon-button">
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
            <div className="icon eye-light-off-icon"></div>
          </div>
        )}
      </div>

      {message !== undefined && (
        <div className="inputbox-message">{message}</div>
      )}
      {"비밀번호는 8자 이상 입력해주세요."}
    </div>
  );
});

export default InputBox;
