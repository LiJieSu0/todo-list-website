import { useEffect,useState } from "react";

export function useSession(){
    const [currUserName,setCurrUserName]=useState('');
    useEffect(()=>{
        async function checkSession(){
            try{
                const response=await fetch('/api/checkSession');
                const result=await response.json();
                if(result.userName!=undefined)
                    setCurrUserName(result.userName);
            }catch(err){
                console.log("Get cookie error "+err);
            }
        }
        checkSession();
    })
    
    return currUserName;
}