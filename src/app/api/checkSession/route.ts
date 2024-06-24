import { getCookiePayload } from "@/utils/cookieConfig";
import { CookiePayload } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const data=await req.json();
    console.log(data);
    const pathVar=data.userName;
    const cookiePayload=getCookiePayload() as CookiePayload;
    if(cookiePayload==undefined|| cookiePayload?.userName!=pathVar){
        return NextResponse.json({"message":"Login session error",status:401});
    }
    return NextResponse.json({"message":"Login session OK",status:200});
}