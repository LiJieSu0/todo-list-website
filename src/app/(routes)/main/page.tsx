"use client"

import ParagraphComponent from "@/app/(components)/mainCompos/paragraphComponent";
import CreateUserCard from "@/app/(components)/mainCompos/createUserCard";
import Navbar from "@/app/(components)/navbar";
import Link from "next/link";
export default function Main(){
    //TODO GEO location to get timezone
    //TODO get cookie privacy
    //TODO push notification
    return(
        // hero component from daisy
        <div>
            <Navbar isLogin={true}/>
            <div className="hero min-h-screen bg-base-200"> 
                <div className="hero-content flex-col ">
                    <ParagraphComponent/>
                    <div className="flex space-x-4">
                        <button className="btn btn-active btn-neutral"><Link href="/login">Login now!</Link> </button>
                        <button className="btn btn-active btn-neutral"><Link href="/signup">Signup here!</Link></button>
                    </div>
                </div>
            </div>
        </div>    
    )

}