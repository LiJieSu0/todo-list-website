import Image from 'next/image';
import ViewTodoModal from './viewTodoModal/viewTodoModalComponent';
import { TodoCardProps } from '../todoCardComponent';
import EditTodoModal from './editTodoModal/editTodoModalComponent';
import DeleteTodoModal from './deleteTodoModal/deleteTodoModalComponent';
import { useState } from 'react';


export default function ButtonList({todoItem,currModal}:TodoCardProps){
    const [title,setTitle]=useState('');
    const [descriptions,setDescriptions]=useState('');
    const [dueDate,setDueDate]=useState('');
    function setCurrModalInfo(){
        currModal.setCurrTitle(todoItem.title);
        currModal.setCurrDescriptions(todoItem.descriptions||"");
        currModal.setCurrDueDate(todoItem.due_date||"");
    }
    function handleShowViewTodoModal(): void {
        if (document) {
            (document.getElementById('view_modal') as HTMLFormElement).showModal();
        }
        setCurrModalInfo();
    }

    function handleShowDeleteTodoModal():void{
        if (document) {
            (document.getElementById('delete_todo_modal') as HTMLFormElement).showModal();
        }
    }

    function handleShowEditTodoModal(): void {
        if (document) {
            (document.getElementById('edit_todo_modal') as HTMLFormElement).showModal();
        }
        setCurrModalInfo();
    }
    return(
        <div className="justify-end mr-5 mb-2 p-2">
            {!todoItem.is_completed&& <button className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/add.png"
                width={20}
                height={20}
                alt="Add pic"
                />
                
            </button>}
            <button onClick={handleShowDeleteTodoModal} className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/bin.png"
                width={20}
                height={20}
                alt="Bin pic"
                />
            </button>
            {!todoItem.is_completed&&<button onClick={handleShowEditTodoModal} className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/pen.png"
                width={20}
                height={20}
                alt="Pen pic"
                />
            </button>}
            <button onClick={handleShowViewTodoModal} className="hover:bg-gray-200 p-2 rounded-full">
                <Image
                src="/viewFile.png"
                width={20}
                height={20}
                alt="View pic"
                />
            </button>
            <ViewTodoModal todoItem={todoItem} currModal={currModal}/>
            <EditTodoModal todoItem={todoItem} currModal={currModal}/>
            <DeleteTodoModal todoItem={todoItem} currModal={currModal}/>
        </div>
    )
}