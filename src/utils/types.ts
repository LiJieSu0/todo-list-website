import {Secret} from 'jsonwebtoken';
interface TodoItem{
    user_id:string,
    title:string,
    create_date:string,
    descriptions?:string,
    doc_uid?:string, //Doc uid created by firebase automatically
    due_date?:string,
    is_completed:boolean
}

interface UserBasicInfo{
    email:string,
    userName:string,
    password:string
    uid?:string,
}

interface CookiePayload{
    uid: string,
    userName: string,
    iat: number
}

const EXPIRES_TIME_IN_SECONDS:number=parseInt(process.env.SESSION_TIME_IN_SECOND as string) ;
const SECRET_KEY:Secret = process.env.TOKEN_SECRET_KEY as string;
const COOKIE_NAME:string=process.env.COOKIE_NAME as string;

export {EXPIRES_TIME_IN_SECONDS,SECRET_KEY,COOKIE_NAME}
export type {TodoItem,UserBasicInfo,CookiePayload}