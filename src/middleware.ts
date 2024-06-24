import { NextResponse,NextRequest } from 'next/server';
import {  jwtVerify } from 'jose';



const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
export async function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname;
    const publicPathArr=['/main','/login','signup'];
    const sessionToken= request.cookies.get('session')?.value||'';
    let currUser:string="";

    try{ //check user name in cookie
        const payload=(await jwtVerify(sessionToken,secret)).payload;
        currUser=payload.userName as string;
    }catch(err){
        console.log("jwt verify err "+err);
    }


    // if(path.startsWith('/dashboard')){
    //     const userNameInPath=path.split('/')[1];
    // }

    if(publicPathArr.includes(path)){
        return NextResponse.next();
    }

    if(sessionToken!=""){
        console.log("in session redirect")
        return NextResponse.redirect(new URL(`/dashboard/${currUser}`,request.nextUrl));
    }
    else{
        return NextResponse.redirect(new URL('/main',request.nextUrl));
    }

}

export const config = {
    matcher:[ 
        '/login',
        '/signup',
        '/dashboard',
        '/main'
    ]
}