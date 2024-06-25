import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface NavbarProps{
    currUserName:string
}
export default function Navbar({currUserName}:NavbarProps){
    const router=useRouter();
    const [isLogin,setIsLogin]=useState(false);
    useEffect(()=>{
        setIsLogin(currUserName!="");
    },[isLogin,currUserName])

    async function handleLogoutBtn(){
        const response=await fetch('/api/logout',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        }) 
        router.push('/main');
    }
    return(
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href='/main' className="btn btn-ghost text-xl">Todo Lists</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                {isLogin&&(<li><button onClick={handleLogoutBtn} className=" border border-black">Log out</button></li>)}
                <li>
                    <details>
                    <summary>
                        My Dashboard
                    </summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                        <li><Link href={`/dashboard/${currUserName}`}>To {currUserName} dashboard</Link></li> 
                        {/* TODO get username from server */}
                        <li></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>
    )
}