import { useRef } from "react";
import { TodoCardProps } from "../../todoCardComponent";


export default function DeleteTodoModal({todoItem}:TodoCardProps){
    const modalRef=useRef<HTMLDialogElement>(null);
    function closeModal(){
        if(modalRef.current){
            modalRef.current.close();
        }
    }
    async function handleDeleteConfirm(){
        try{
            const response=await fetch('/api/todolist',{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    "doc_uid":todoItem.doc_uid,
                })
            })
            window.location.reload();
        }catch(err){
            console.log("Delete Err "+err);
        }
    }

    return(
        <div>
            <dialog ref={modalRef} id="delete_todo_modal" className="modal">
            <div className="modal-box h-48">
                <div className="flex">
                    <h3 className="font-bold text-lg">Delete Todo!</h3>
                    <button onClick={closeModal} className=" absolute right-3">test btn</button>
                </div>
                <p className="py-4">Are you sure you want to delete?</p>
                <div className="flex">
                    <button onClick={handleDeleteConfirm} className="">Yes</button>
                    
                    <button onClick={closeModal} className="">No</button>
                </div>
            </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}