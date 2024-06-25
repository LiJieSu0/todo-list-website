"use client"

import ParagraphComponent from "@/app/(components)/mainCompos/paragraphComponent";
import CreateUserCard from "@/app/(components)/mainCompos/createUserCard";
import Navbar from "@/app/(components)/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/utils/useSession";
export default function Main(){
    //TODO get GEO location to get timezone
    //TODO get cookie privacy
    //TODO get permission push notification
    const currUserName=useSession();
    return(
        // hero component from daisy
        <div>
            <Navbar currUserName={currUserName}/>
            <div className="hero min-h-screen bg-base-200"> 
                <div className="hero-content flex-col ">
                    <ParagraphComponent/>
                    <div className="flex space-x-4">
                        <button className="btn btn-active btn-neutral"><Link href="/login">Log in now!</Link> </button>
                        <button className="btn btn-active btn-neutral"><Link href="/signup">Sign up here!</Link></button>
                    </div>
                </div>
            </div>
        </div>    
    )

}

