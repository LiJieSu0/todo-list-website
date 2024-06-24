import { FormEvent, FormEventHandler, useEffect } from "react";
import { useState,useRef } from 'react';
import { TodoCardProps } from "../../todoCardComponent";
export default function ViewTodoModal({todoItem,currModal}:TodoCardProps){
    console.log(todoItem.title);
    const modalRef=useRef<HTMLDialogElement>(null);
    function closeModal(){
        if(modalRef.current){
            modalRef.current.close();
        }
    }
    function handleCloseBtn(e:any): void {
        e.preventDefault();
        closeModal();
    }

    return(
        <div>
            <dialog ref={modalRef} id="view_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl h-5/6">
                        <div className="flex">
                            <h3 className="font-bold text-lg">View Todo!</h3>
                            <button onClick={closeModal} className=" absolute right-2">test btn</button>
                        </div>
                        <form >
                            <div className="mb-5">
                                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="title" value={currModal.currTitle} className=" shadow-md
                                                                            bg-gray-50 border border-gray-300
                                                                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                                                                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                                                                            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                                                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Title for your thing"
                                                                            required
                                                                            disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="descriptions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descriptions</label>
                                <textarea id="descriptions" value={currModal.currDescriptions} rows={10} className=" shadow-md block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Details..." disabled></textarea>
                            </div>
                            <div>
                                <label htmlFor="date" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                                <input type="date" id="date" value={currModal.currDueDate } className="shadow-md block p-2 text-gray-900 border border-gray-300 rounded-lg 
                                                                            bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 
                                                                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                                                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            disabled
                                                                            />
                            </div>
                            <button onClick={(e)=>handleCloseBtn(e)} className="absolute bottom-4 right-6
                                                                mt-2 btn btn-active">Close</button>
                        </form>

                        <div className="modal-action">

                        </div>
                    </div>
            </dialog>
        </div>
    )

}

