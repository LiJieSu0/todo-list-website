import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { EXPIRES_TIME_IN_SECONDS, SECRET_KEY,COOKIE_NAME } from "./types";
import jwt from 'jsonwebtoken';

export const setSessionCookieWithResponse = (token: string,response:NextResponse):NextResponse => {
  if(token!=undefined){
    const expireTime=new Date(new Date().getTime()+EXPIRES_TIME_IN_SECONDS*1000);
    response.cookies.set(COOKIE_NAME,token,{httpOnly:true,expires:expireTime});
    return response;
  }
  return response;
};

export const getSessionCookie = (): string | undefined => {
    const session=cookies().get(COOKIE_NAME)?.value;
    if(!session)
        return undefined;
    return session.toString();
};

export const renewCookie=(response:NextResponse):NextResponse=>{
    const sessionValue=getSessionCookie();
    if(sessionValue==undefined){
        response.cookies.set(COOKIE_NAME,'');
        return response;
    }
    const expireTime=new Date(new Date().getTime()+EXPIRES_TIME_IN_SECONDS*1000);
    response.cookies.set(COOKIE_NAME,sessionValue,{expires:expireTime});
    return response;
}

export const getCookiePayload=()=>{
    const sessionValue=getSessionCookie();
    if(sessionValue!=undefined){
      return jwt.verify(sessionValue,SECRET_KEY)
    }
    return undefined;
}

export const deleteCookie = (cookieName:string) => {
    cookies().delete(cookieName);
};