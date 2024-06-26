import { NextResponse,NextRequest } from "next/server";
import { addUserDoc, userSignup } from "@/utils/firebaseConfig";


//TODO refactor signup
export async function POST(req:NextRequest){
    const data=await req.json();
    console.log("Post received");
    console.log(JSON.stringify(data));
    try{
        const fireBaseResponse=await userSignup(data.email,data.password);
        let message="";
        let statusCode=500;
        if(fireBaseResponse.user!=undefined){
            addUserDoc(fireBaseResponse.user.uid,data.userName);//TODO another way to handle user docs     
            return NextResponse.json({"message":"User signup success",status:200});
        }
        console.log(fireBaseResponse);
        switch(fireBaseResponse){ 
            case "auth/weak-password": //TODO handle correct error code.
                message="Password is too weak";
                statusCode=500;
                break;
            case 'auth/invalid-email':
                message = 'Invalid email';
                statusCode=500;
                break;
            case "auth/email-already-in-use":
                message="Email already exist";
                statusCode=500;
        }

        return NextResponse.json({"message":message,status:statusCode});

    }catch(err:any){
        console.log(err.message);
        return NextResponse.json({"message":err.message,status:500});
    }
    

}

