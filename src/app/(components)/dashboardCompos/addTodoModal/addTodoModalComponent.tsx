import { FormEvent } from "react";
import { useState,useRef } from 'react';


export default function AddTodoModal(){
    const [title, setTitle] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [dueDate, setDueDate] = useState('');
    const modalRef=useRef<HTMLDialogElement>(null);
    async function handleAddTodoSubmit(e:FormEvent<HTMLFormElement>){
        closeModal();
        e.preventDefault();
        const createdDate=formatDate(new Date().toLocaleDateString());
        //TODO check due date is passed or not
        try{
            const response=fetch('/api/todolist',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    "title":title,
                    "descriptions":descriptions,
                    "created_date":createdDate,
                    "due_date":dueDate,
                    "is_completed":false,
                })
            })
            todoFormReset();
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

    function todoFormReset() {
        setTitle('');
        setDescriptions('');
        setDueDate('');
    }
    function closeModal(){
        if(modalRef.current){
            modalRef.current.close();
        }
    }
    return(
        <div>
            <dialog ref={modalRef} id="add_todo_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl h-5/6">
                        <div className="flex">
                            <h3 className="font-bold text-lg">Add Todo!</h3>
                            <button onClick={closeModal} className=" absolute right-2">test btn</button>
                        </div>
                        <form onSubmit={handleAddTodoSubmit}>
                            <div className="mb-5">
                                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} className=" shadow-md
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
                                <textarea id="descriptions" value={descriptions} onChange={(e)=>setDescriptions(e.target.value)} rows={10} className=" shadow-md block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Details..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="date" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                                <input type="date" id="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} className="shadow-md block p-2 text-gray-900 border border-gray-300 rounded-lg 
                                                                            bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 
                                                                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                                                            dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <button type="submit"  className="absolute bottom-4 right-6
                                                                mt-2 btn btn-active">Submit</button>
                        </form>

                        <div className="modal-action">

                        </div>
                    </div>
            </dialog>
        </div>
    )

}

