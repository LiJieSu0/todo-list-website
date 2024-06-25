import { getCookiePayload } from "@/utils/cookieConfig";
import { CookiePayload } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(data);
    const pathVar=data.userName;
    const cookiePayload=getCookiePayload();
    console.log(cookiePayload==undefined);
    if(cookiePayload==undefined|| cookiePayload?.userName!=pathVar){
        return NextResponse.json({"message":"Login session error",status:401});
    }
    return NextResponse.json({"message":"Login session OK",status:200});

}

export async function GET(){
    const cookiePayload=getCookiePayload();
    if(cookiePayload==undefined){
        return NextResponse.json({"message":"Login session error","isLogin":false,status:401});
    }
    return NextResponse.json({"message":"Login session OK","isLogin":true,"userName":cookiePayload.userName,status:200});
}