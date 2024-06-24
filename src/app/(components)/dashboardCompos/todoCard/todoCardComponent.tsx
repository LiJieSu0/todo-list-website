import { useState } from "react";
import ButtonList from "./buttonList/btnListComponent";
import { TodoItem } from "@/utils/types";
import { CurrModal } from "@/app/(routes)/dashboard/[id]/page";
export interface TodoCardProps {
    todoItem: TodoItem,
    currModal:CurrModal
};
export default function TodoCard({todoItem,currModal}:TodoCardProps){
    const [isMouseDown,setIsMouseDown] = useState(false);
    function handleCardClick(): void {
        console.log("Card Clicked");
    }

    function handleButtonClick(event: any): void {
        event.stopPropagation();
    }

    return(
            <div  className="card w-96 h-80 rounded-lg shadow-lg hover:shadow-2xl
                bg-lime-400 active:bg-lime-600">
                <div onClick={handleCardClick}>
                    <div className="bg-lime-600 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold truncate">{todoItem.title}</h2>
                    {/* TODO add tooltips for title */}
                    </div>
                    <div className="card-body items-start text-left p-5  ">
                        {todoItem.descriptions==''?(<>No descriptions left</>):
                                                        (<p className="max-h-44 min-h-44 overflow-hidden text-ellipsis">{todoItem.descriptions}</p>)}
                    </div>
                </div>
                <div className=" absolute bottom-0 right-0">
                    <ButtonList todoItem={todoItem} currModal={currModal}/>
                </div>
            </div>
    )
}