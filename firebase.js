//code related to firebase
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import "firebase/firestore"
import  {firebaseConfig} from "./config/firebase"
import * as Expo from 'expo'

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const auth = firebase.auth();


export const getUid = () =>{
    const user = firebase.auth().currentUser
    if(user){
        return{uid: user.uid}
    }
    else{
        return{uid:null}
    }
}


export const db = firebaseApp.firestore();
export const userCollection = db.collection("Users");


export const addUserToDB =()=>{
    const batch = db.batch();
    const userCollection = db.collection("Users");
    const {uid} =  getUid();
    const userRef = userCollection.doc(uid);
    try{
        batch.set(userRef,{name:"未設定"});
        batch.commit()
            .then(()=>{
                console.log("add user success");
            })
    }
    catch(e){
        console.log("err to add user",e);
    }
}

export const getNowDate = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
}

export const set_Content =(content)=>{
    const batch = db.batch();
    const userCollection = db.collection("Users");
    const {uid} =  getUid();
    const time = getNowDate();
    const userRef = userCollection.doc(uid).collection("books").doc(content.isbn).set(content);
    userCollection.doc(uid).collection("books").doc(content.isbn).update({addedDate:getNowDate()});
}

export const delete_Content=(content)=>{
    const {uid} = getUid();
    const userCollection = db.collection("Users");
    let deleteDoc = userCollection.doc(uid).collection("books").doc(content.isbn).delete()
}

export const fetch_books=()=>{
    const {uid} = getUid();
    const userCollection = db.collection("Users");
    return userCollection.doc(uid).collection("books").get()
}

