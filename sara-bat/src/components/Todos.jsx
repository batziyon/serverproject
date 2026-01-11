
import { useState, useEffect } from "react";
import { selectTodos } from "./Api";
import { toggleCompleted } from "./Api";

function Todos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await selectTodos();
                setTodos(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load todos");
            } finally {
                setLoading(false);
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



    const sortTodos = (type) => {
        let sorted = [];
        switch (type) {
            case "ID":
                sorted = [...todos].sort((a, b) => a.id - b.id);
                break;
            case "title":
                sorted = [...todos].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "completed":
                sorted = [...todos].sort((a, b) => a.completed - b.completed);
                break;
        }
        setTodos(sorted);
    }

    const SearchTodos = (type) => {
        let filtered = [];
        switch (type) {
            case "id":
                filtered = todos.filter((todo) => todo.id.toString() === searchValue);  
                break;
            case "title":
                filtered = todos.filter((todo) => todo.title.includes(searchValue));        
                break;
            case "completed":
                const isCompleted = searchValue.toLowerCase() === 'true';
                filtered = todos.filter((todo) => todo.completed === isCompleted);
                break;
        }
        setTodos(filtered);
    }

    if (loading) return <p>טוען משימות...</p>;
    if (error) return <p>שגיאה: {error}</p>;


    return (
        <div>
            <h2>Todos</h2>




            <h3>חיפוש משימות</h3>
            <div>
                <label htmlFor="searchType">חיפוש לפי:</label>
                <select id="searchType" name="searchType" onChange={(e) => SearchTodos(e.target.value)}>
                    <option value="id">מזהה </option>
                    <option value="title">כותרת</option>
                    <option value="completed">מצב ביצוע</option>
                </select>
                <label htmlFor="searchValue">ערך לחיפוש:</label>
                <input
                    type="text"
                    id="searchValue"
                    name="searchValue"
                    placeholder="הקלידי ערך לחיפוש" onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" >חפש</button>
            </div>


            <label htmlFor="order">מיון לפי:</label>
            <select id="order" name="order" onChange={(e) => sortTodos(e.target.value)}>
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


