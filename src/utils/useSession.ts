import { useEffect,useState } from "react";

export function useSession(){
    const [currUserName,setCurrUserName]=useState('');
    useEffect(()=>{
        async function checkSession(){
            try{
                const response=await fetch('/api/checkSession');
                const result=await response.json();
                setCurrUserName(result.userName);
            }catch(err){
                console.log("Get cookie error "+err);
            }
        }
        checkSession();
    })
    return currUserName;
}