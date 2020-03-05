import {SINGUP_MAIL,LOGIN_MAIL,LOGOUT} from "../actionTypes"

export const signup_mail = (email,password)=>{
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user=>{
            if(user){
                console.log("SUCCESS to SIGNUP")
                return {type:SINGUP,payload:user}
            }
        })
        .catch(err=>{
            console.log("err=>",err)
        })
}

export const login_mail = (email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user=>{
            if(user){
                console.log("Success to login")
                return{type:LOGIN_MAIL,payload:user}
            }
        })
        .catch(err=>{
            console.log("err->",err)
        })
}

export const logout = ()=>{
    firebase.auth().signOut()
     .then(res=>{
         console.log("sucsess to logout")
     })
    .catch(err=>{
        console.log("err=>",err)
    })

    return {type:LOGOUT}
}
