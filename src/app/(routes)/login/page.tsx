'use client';

import Navbar from "@/app/(components)/navbar";
import LoginForm from "@/app/(components)/loginForm";
import { FormEvent, useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function Login(){
    const [email,setEmail]=useState<string>('');
    const [userName,setUserName]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [isLogin,setIsLogin]=useState(false);
    const router=useRouter();

    useEffect(()=>{

    },[isLogin]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data={
            email:email,
            userName:userName,
            password:password
        }
        try{
            const response=await fetch('/api/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            });
            const responseJSON=await response.json();
            router.push('/dashboard/'+responseJSON.userName);
        }catch(err){
            console.log("Login Page Err "+err);
        }
        setEmail('');
        setUserName('');
        setPassword('');
    }
    async function handleLogout() {
        try{
            const response=await fetch('/api/todolist',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({})
            });
            if(response.status==200){
                
            }

        }catch(err){
            console.log("Login error "+err);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-orange-200">
            <Navbar isLogin={false}/>

            {isLogin?(<h1>Log in success</h1>):(<h1>Please login first</h1>)}
            <div className="flex flex-grow justify-center items-center">
                <div className="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl mb-6 text-center">Login Page</h1>
                    <form onSubmit={handleSubmit}>
                        
                        <LoginForm 
                            email={email} userName={userName} password={password}
                            setEmail={setEmail} setUserName={setUserName} setPassword={setPassword}/>
                        <div className="flex justify-evenly mt-5">
                            <button className="btn btn-active btn-ghost hover:bg-slate-500 hover:text-stone-300">Login</button>
                            <button onClick={handleLogout} className="btn btn-active btn-ghost hover:bg-slate-500 text-center">Need help ?</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}