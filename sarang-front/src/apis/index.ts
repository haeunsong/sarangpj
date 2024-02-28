import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import axios from 'axios';
import { SignInResponseDto } from "./response/auth";
import { ResponseDto } from "./response";


const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// export const signInRequest = async (requestBody: SignInRequestDto ) => {
//     const result = await axios.post(SIGN_IN_URL(),requestBody)
//         .then(response => {
//             const responseBody: SignInResponseDto = response.data;
//             return responseBody;
//         })
//         .catch(error => {
//     if(!error.response.data) return null;
//     const responseBody: ResponseDto = error.response.data;
//     return responseBody;

// })
// return result
//
//
// } 

export const signInRequest = async (requestBody: SignInRequestDto) => {
    try {
        const response = await axios.post(SIGN_IN_URL(), requestBody);
        const responseBody: SignInResponseDto = response.data;
        return responseBody;
    }catch(error){
        if (axios.isAxiosError(error)) {
            const responseBody: ResponseDto = error.response?.data;
            return responseBody;
        } else {
            throw error; // AxiosError가 아닌 다른 타입의 오류는 다시 던짐
        }
        
    }
}

export const signUpRequest = async (requestBody:  SignUpRequestDto) => {

}