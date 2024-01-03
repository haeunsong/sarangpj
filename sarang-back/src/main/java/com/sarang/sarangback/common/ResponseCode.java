package com.sarang.sarangback.common;

public interface ResponseCode {

    /*
     * interface 는 무조건 모든 변수를 public static final 로 지정해야 한다.
     * 이게 default 라서 지워도 됨.
     */

    // HTTP Status 200
    public static final String SUCCESS = "SU";
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    String DUPLICATE_TEL_NUMBER = "DT";
    String NOT_EXISTED_USER = "NU";
    String NOT_EXISTED_BOARD = "NB";

    // HTTP Status 401
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";

    // HTTP Status 403
    String NO_PERMISSION = "NP";

    // HTTP Status 500
    String DATABASE_ERROR = "DBE";

}