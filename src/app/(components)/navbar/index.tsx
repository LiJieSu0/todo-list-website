import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

interface NavbarProps{
    isLogin:boolean
}
export default function Navbar({isLogin}:NavbarProps){
    const router=useRouter();
    const [userName,setUserName]=useState('');

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
                <a className="btn btn-ghost text-xl">Todo Lists</a>
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
                        <li><Link href={`/dashboard/${userName}`}>To my dashboard</Link></li> 
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