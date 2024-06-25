import { FormEvent, useState } from "react";
import { useRef } from 'react';
import { TodoCardProps } from "../../todoCardComponent";

export default function EditTodoModal({todoItem,currModal}:TodoCardProps){

    const modalRef=useRef<HTMLDialogElement>(null);


    async function handleEditTodoSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const response=fetch('/api/todolist',{
                method:'PUT',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    "title":currModal.currTitle,
                    "descriptions":currModal.currDescriptions,
                    "created_date":todoItem.create_date,
                    "due_date":currModal.currDueDate,
                    "user_id":todoItem.user_id,
                    "doc_uid":todoItem.doc_uid,
                    "is_completed":currModal.currEditIsComplete
                })
            })
            closeModal();
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    function formatDate(localTime:string):string{
        const month=localTime.split('/')[0];
        const day=localTime.split('/')[1];
        const year=localTime.split('/')[2];
        return `${year}-${month}-${day}`
    }


    function closeModal(){
        if(modalRef.current){
            modalRef.current.close();
        }
    }
    function handleCompleteCheckBox(){
        currModal.setcurrEditIsComplete((prev)=>!prev);
    }

    return(
        <div>
            <dialog ref={modalRef} id="edit_todo_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl h-5/6">
                        <div className="flex">
                            <h3 className="font-bold text-lg">Edit Todo!</h3>
                            <button onClick={closeModal} className=" absolute right-6">X</button>
                        </div>
                        <form onSubmit={handleEditTodoSubmit}>
                            <div className="mb-5">
                                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="title" value={currModal.currTitle} 
                                onChange={(e)=>currModal.setCurrTitle(e.target.value)} 
                                className=" shadow-md
                                                                            bg-gray-50 border border-gray-300
                                                                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                                                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                                                                            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                                                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Title for your thing"
                                                                            required
                                />
                            </div>
                            <div>
                                <label htmlFor="descriptions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descriptions</label>
                                <textarea id="descriptions" value={currModal.currDescriptions} 
                                onChange={(e)=>currModal.setCurrDescriptions(e.target.value)} 
                                rows={10} className=" shadow-md block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Details..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="date" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                                <div className="flex">
                                    <input type="date" id="date" value={currModal.currDueDate} 
                                    onChange={(e)=>currModal.setCurrDueDate(e.target.value)} 
                                    className="shadow-md block p-2 text-gray-900 border border-gray-300 rounded-lg 
                                                                                bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 
                                                                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                                                                dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                    <label className="cursor-pointer label ml-2">
                                        <span className="label-text mr-2">Completed?</span>
                                        <input type="checkbox" 
                                                checked={currModal.currEditIsComplete} 
                                                onChange={handleCompleteCheckBox}
                                                className="checkbox checkbox-success" />
                                    </label>
                                </div>

                            </div>

                            <button type="submit"  className="absolute bottom-4 right-6
                                                                mt-2 btn btn-active">Submit Change</button>
                        </form>
                        <div className="modal-action">

                        </div>
                    </div>
            </dialog>
        </div>
    )

}

