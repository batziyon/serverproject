import { useState } from "react";
function CommentsItem({ item, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    //const [name, setName] = useState(item.name);

    return (
      <>
                <div >ID: {item.id}</div>
                {!isEditing ? (
                    <div className={item.name}>{item.name}</div>
                ) : (

                    <div className={item.body}>{item.body}</div>)}
                <div>
                    <button onClick={() => setIsEditing(!isEditing)}>פתח תגובה</button>
                    <button onClick={() => onDelete(item.id)} >מחק</button>
            </div>
            </>
    );
}
export default CommentsItem;