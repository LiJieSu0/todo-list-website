import { NextResponse,NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { addTodoItem, deleteTodoItem, getTodoDocsWithUserId, getUserDocWithUid, updateTodoItem } from "@/utils/firebaseConfig";
import { getCookiePayload, getSessionCookie } from "@/utils/cookieConfig";
import { CookiePayload, TodoItem } from "@/utils/types";



const SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;

export async function GET(){
    //TODO get user id from session;
    const cookiePayload=getCookiePayload() as CookiePayload;
    if(cookiePayload==undefined){
        return NextResponse.json({"message":"No session cookie founded",status:401})
    }
    const userId=cookiePayload.uid;
    const response=await getTodoDocsWithUserId(userId);
    return NextResponse.json({"data":response,"message":"todolist retrieved",status:200});
} 


export async function POST(req:NextRequest){ //add new todo
    const receivedData=await req.json();
    console.log("Post received");
    console.log(JSON.stringify(receivedData));
    const sessionToken= req.cookies.get('session')?.value||'';
    try{
        const payload=jwt.verify(sessionToken,SECRET_KEY) as jwt.JwtPayload;
        const data={
            ...receivedData,
            user_id:payload.uid,
        }
        console.log(data);
        addTodoItem(data);
        return NextResponse.json({"message":"Success to add todo",status:200});
    }catch(err){
        console.log("Api Err Add todo "+ err);
        return NextResponse.json({"message":"Fail to add todo",status:500});
    }
}

export async function PUT(req:NextRequest){
    const data=await req.json();
    console.log("PUT received");
    console.log(JSON.stringify(data));
    try{
        updateTodoItem(data.doc_uid,data);
        return NextResponse.json({"message":"Todo updated",status:200});

    }catch(err){
        console.log("PUT err "+err);
        return NextResponse.json({"message":"Todo update failed",status:500});

    }
}

export async function DELETE(req:NextRequest){
    const data:TodoItem=await req.json();
    console.log("Delete todo request received");
    console.log(data);
    if(data.doc_uid!=undefined){
        deleteTodoItem(data.doc_uid);
        return NextResponse.json({"message":"Todo deleted",status:200});
    }
    else{
        console.log("Doc uid undefined when delete");
        return NextResponse.json({"message":"Todo delete failed",status:500});
    }
}