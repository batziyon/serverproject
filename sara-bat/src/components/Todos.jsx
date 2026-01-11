
import { useState, useEffect } from "react";
import { selectTodos } from "./Api"; // ודא שהנתיב נכון
import { toggleCompleted } from "./Api"; // ודא שהנתיב נכון

function Todos() {
    const [todos, setTodos] = useState([]);       // כאן נשמרים הנתונים
    const [loading, setLoading] = useState(true); // מצב טעינה
    const [error, setError] = useState(null);     // מצב שגיאה

    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await selectTodos(); // קורא לפונקציה האסינכרונית
                setTodos(data);                   // שמירת הנתונים במצב
            } catch (err) {
                console.error(err);
                setError("Failed to load todos");
            } finally {
                setLoading(false);                // סיום טעינה
            }
        }

        fetchTodos();
    }, []);

    const handleToggle = async (todo) => {
        try {
            const updated = await toggleCompleted(todo);
            setTodos((prev) =>
                prev.map((t) => (t.id === updated.id ? updated : t))
            );
        } catch (err) {
            console.error(err);
            setError("Failed to update todo");
        }
    };


    if (loading) return <p>טוען משימות...</p>;
    if (error) return <p>שגיאה: {error}</p>;


    return (
        <div>
            <h2>Todos</h2>
            <label for="order">מיון לפי:</label>
            <select id="order" name="order">
                <option value="ID">ID</option>
                <option value="title">כותרת</option>
                <option value="completed">ביצוע</option>
            </select>
            {todos.length === 0 ? (
                <p>אין משימות להצגה</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            {todo.id}
                            {todo.title}
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo)}
                            />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );

}

export default Todos;


// פונקציה שמעדכנת את ה-completed של משימה אחת בשרת


