import { User } from "types/interface";
import { create } from "zustand";

interface LoginUserStore {
    loginUser: User | null;
    setLoginUser: (loginUser: User) => void;
    resetLoginUser: () => void; 
}

// 전역변수 설정
const useLoginUserStore = create<LoginUserStore>(set => ({
    loginUser: null,
    setLoginUser: loginUser => set(state => ({...state, loginUser})),
    resetLoginUser: () => set(state => ({...state,loginUser:null}))
}))

export default useLoginUserStore;