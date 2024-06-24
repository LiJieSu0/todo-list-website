'use client';
import Navbar from "@/app/(components)/navbar";
import { useRouter } from "next/navigation";
import { useState,useEffect, useRef } from "react";

import { TodoItem } from "@/utils/types";
import TodoCard from "@/app/(components)/dashboardCompos/todoCard/todoCardComponent";
import AddTodoModal from "@/app/(components)/dashboardCompos/addTodoModal/addTodoModalComponent";

export interface CurrModal{
    currTitle:string,
    currDescriptions:string,
    currDueDate:string,
    setCurrTitle:React.Dispatch<React.SetStateAction<string>>,
    setCurrDescriptions:React.Dispatch<React.SetStateAction<string>>,
    setCurrDueDate:React.Dispatch<React.SetStateAction<string>>
}

export default function Dashboard({params}:any){
    //TODO Logout button
    const router=useRouter();
    const [todoItems,setTodoItems]=useState<TodoItem[]>([]);
    const [completedItems,setCompletedItems]=useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isShowingTodo,setIsShowingTodo] =useState(true);
    const [isShowingComplete,setIsShowingComplete] =useState(true);

    const [currTitle,setCurrTitle]=useState('');
    const [currDescriptions,setCurrDescriptions]=useState('');
    const [currDueDate,setCurrDueDate]=useState('');
    const currModal:CurrModal={
        currTitle,
        currDescriptions,
        currDueDate,
        setCurrTitle,
        setCurrDescriptions,
        setCurrDueDate
    }
    useEffect(()=>{
        //TODO redirect user to main if there is no session
        const checkLogin=async ()=>{
            const response=await fetch ('/api/checkSession',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({'userName':params.id})
            })
            console.log(response.status);
            if(response.status!=200) //login session error
                router.push('/main');
        }
        const fetchData = async () => {
                try {
                    const fetchedData = await fetch('/api/todolist')
                        .then(response=>response.json());
                    setTodoItems(fetchedData.data.filter((item:TodoItem)=>item.is_completed==false));
                    setCompletedItems(fetchedData.data.filter((item:TodoItem)=>item.is_completed==true));
                    setIsLoading(false);
                } catch (error) {
                console.error('Error fetching data:', error);
                }
            };
            checkLogin();
            fetchData(); 
    },[router,params])

    function handleShowAddTodoModal(): void {
        if (document) {
            (document.getElementById('add_todo_modal') as HTMLFormElement).showModal();
        }
    }

    function handleTodoFolding() {
        setIsShowingTodo((prev:boolean)=>!prev);
    }
    function handleCompleteFolding() {
        setIsShowingComplete((prev:boolean)=>!prev);
    }

    return(
        <div className="">
                <Navbar isLogin={true}/>
            <div className="bg-primary text-primary-content flex"> 
                <button className="btn btn-ghost text-xl" onClick={handleTodoFolding}>Todo List </button>
                {isShowingTodo?(<p>-</p>):(<p>+</p>)}
            </div>
            {isShowingTodo&& //Folding todo cards 
            (<div className="flex flex-wrap gap-4 justify-items-start mx-10 mb-5 mt-3">
                {isLoading?(<h1>Loading...</h1>):(
                    <>
                        {todoItems.map((item:TodoItem,index:number)=>
                            <TodoCard key={index} todoItem={item} currModal={currModal} />
                        )}
                        <div className="flex justify-center items-center bg-slate-800 w-96">
                            <button onClick={handleShowAddTodoModal} className="hover:bg-gray-200 
                                                border-double border-4 border-stone-500 
                                                bg-gray-100 shadow-lg rounded-lg w-40 h-40">
                                +
                            </button>
                        </div>
                        <AddTodoModal/>
                    </>
                )}
            </div>)}

            <div className="bg-primary text-primary-content my-2 flex">
                <button onClick={handleCompleteFolding} className="btn btn-ghost text-xl">
                    Completed {isShowingComplete ? (<span>-</span>) : (<span>+</span>)}
                </button>
            </div>
            {isShowingComplete&&
                (<div className="flex flex-wrap gap-4 justify-items-start mx-10 mb-5 mt-3">
                {isLoading?(<div>Loading...</div>):
                    (<>
                        {completedItems.map((item:TodoItem,index:number)=>
                        // TODO set completed Item cards
                            <TodoCard key={index} todoItem={item} currModal={currModal}/>
                        )}
                    </>)}
            </div>
            )
                }
        </div>
    )
}