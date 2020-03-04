import {LOGIN,LOGOUT} from "../actionTypes"

import{ firebaseConfig} from "../../config/firebase"

export const login = content=>({
    type:LOGIN,
    payload:{
        content
    }
});

export const logout = ()=>({
    type:LOGOUT
});
