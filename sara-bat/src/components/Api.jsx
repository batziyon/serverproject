export async function selectTodos() {
    localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: 2, fullName: "משתמש לדוגמה" })
    );
    const savedUser = localStorage.getItem("currentUser");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    try {
        const res = await fetch(
            `http://localhost:3000/todos?userId=${currentUser.id}`
        );
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}

export async function toggleCompleted(todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
        const res = await fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: updatedTodo.completed }),
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return await res.json();
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
}






