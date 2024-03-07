enum ResponseCode {
        // HTTP Status 200
         SUCCESS = "SU",
         VALIDATION_FAILED = "VF",
         DUPLICATE_EMAIL = "DE",
         DUPLICATE_NICKNAME = "DN",
         DUPLICATE_TEL_NUMBER = "DT",
         NOT_EXISTED_USER = "NUaaa",
         NOT_EXISTED_BOARD = "NB",
    
        // HTTP Status 401
         SIGN_IN_FAIL = "SF",
         AUTHORIZATION_FAIL = "AF",
    
        // HTTP Status 403
         NO_PERMISSION = "NP",
    
        // HTTP Status 500
         DATABASE_ERROR = "DBE",
}

export default ResponseCode;