import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import { collection, getFirestore, onSnapshot,getDocs, doc, getDoc, 
        addDoc,deleteDoc, updateDoc,
        query, where, limit,
        
    } from "firebase/firestore";
import { initialize } from "next/dist/server/lib/render-server";
import { TodoItem, UserBasicInfo } from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyBGYUPFMSA-Y96MFI6Q2AZxQxk-FQuWxLk",
    authDomain: "todowebsite-c93c2.firebaseapp.com",
    projectId: "todowebsite-c93c2",
    storageBucket: "todowebsite-c93c2.appspot.com",
    messagingSenderId: "698972296432",
    appId: "1:698972296432:web:49e1080f11c9d5e52c5e35",
    measurementId: "G-H6J0915CEE"
};
const TODO_COLLECTION_NAME='todos';
const USER_COLLECTION_NAME='userInfos';
initializeApp(firebaseConfig);
const db=getFirestore();
const todoCollectionRef=collection(db,TODO_COLLECTION_NAME);
const userInfoCollectionRef=collection(db,USER_COLLECTION_NAME);
const auth=getAuth();


const userSignup=async(email:string,password:string)=>{
    try{
        const firebaseResponse=await createUserWithEmailAndPassword(auth,email,password);
        return firebaseResponse;
    }catch(err:any){ //TODO firebase error type handle
        console.log("Signup user err "+err.code);
        return err.code;
    }
}

const getUserDocWithUid=async (uid:string)=>{
    try{
        const userQuery=query(userInfoCollectionRef,
                                where('uid','==',uid),
                                limit(1)); 
        const snapshot= await getDocs(userQuery);
        if(!snapshot.empty){
            return snapshot.docs[0].data().username; //TODO change firebase field name
        }
    }catch(err){
        console.log("Get user Doc with uid "+err);
    }
}

const getTodoDocsWithUserId=async(uid:string)=>{
    try{
        const todoQuery=query(todoCollectionRef,
                                where('user_id','==',uid))
        const snapshot=await getDocs(todoQuery);
        if(!snapshot.empty){
            const todos=snapshot.docs.map((item)=>({
                doc_uid:item.id,
                ...item.data()
            }))
            return todos;
        }
    }catch(err){
        console.log("Get todo docs with user_id "+err);
    }
}

const addTodoItem=async(todoItem:TodoItem)=>{
    try{
        addDoc(todoCollectionRef,todoItem);
    }catch(err){
        console.log("Add todo "+err);
    }
}

const addUserDoc=async(uid:string,userName:string)=>{
    try{
        addDoc(userInfoCollectionRef,{
            "user_id":uid,
            "username":userName
        })
    }catch(err){
        console.log("add user err "+err);
    }
}

const deleteTodoItem=async(uid:string)=>{
    const docRef=doc(db,TODO_COLLECTION_NAME,uid);
    try{
        deleteDoc(docRef);
    }catch(err){
        console.log("Delete Err "+err);
    }
}

const updateTodoItem=async(uid:string, data:TodoItem)=>{
    const docRef=doc(db,TODO_COLLECTION_NAME,uid);
    try{
        updateDoc(docRef,{...data});
    }catch(err){
        console.log("Update Err "+err);
    }
}

export {db,todoCollectionRef,auth,firebaseConfig,
        userSignup,addUserDoc,
        addTodoItem,deleteTodoItem,updateTodoItem,
        getUserDocWithUid,getTodoDocsWithUserId};