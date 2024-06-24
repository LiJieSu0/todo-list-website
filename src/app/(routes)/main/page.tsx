import ParagraphComponent from "@/app/(components)/mainCompos/paragraphComponent"
import CreateUserCard from "@/app/(components)/mainCompos/createUserCard"
export default function Main(){
    //TODO GEO location to get timezone
    //TODO get cookie privacy
    //TODO push notification
    return(
        // hero component from daisy    
        <div className="hero min-h-screen bg-base-200"> 
            <div className="hero-content flex-col lg:flex-row-reverse">
                <ParagraphComponent/>
                <CreateUserCard/>
            </div>
        </div>
    )

}