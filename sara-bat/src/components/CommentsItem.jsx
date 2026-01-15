import { useState } from "react";
//import styles from "../css/Coments.css";


function CommentsItem({ item, onDelete, onChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);

    return (
        <div className={styles.body}>{item.body}

        <div className={styles.card}>


            <div className={styles.info}>
                <div className={styles.id}>ID: {item.id}</div>
                {!isEditing ? (
                    <div className={styles.title}>{item.name}</div>
                ) : (

                    <div className={styles.id}>{item.body}</div>)}

                <div className={styles.actions}>
                    <button onClick={() => setIsEditing(!isEditing)}>פתח תגובה</button>

                    <button onClick={() => onDelete(item.id)} className={`${styles.btn} ${styles.delete}`}>מחק</button>

                </div>
            </div>
        </div>
        </div>
    );
}
export default CommentsItem;