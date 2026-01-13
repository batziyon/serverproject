const BASE_URL = "http://localhost:3000";


// התחברות
export async function login(username, password) {
  const res = await fetch(
    `${BASE_URL}/users?username=${username}&password=${password}`
  );

  if (!res.ok) {
    throw new Error("שגיאה בהתחברות");
  }

  const users = await res.json();
  return users.length ? users[0] : null;
}


export async function signUp(username) {
  const checkRes = await fetch(`${BASE_URL}/users?username=${encodeURIComponent(username)}`);
  if (!checkRes.ok) {
    throw new Error("שגיאה בבדיקת המשתמשים");
  }
  const existingUsers = await checkRes.json();

  if (existingUsers.length > 0) {
    throw new Error("שם משתמש כבר קיים");
  }
  return null;
}


export async function createUser(user) {
  if (!user.username) {
    throw new Error("חסר שם משתמש");
  }

  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error("שגיאה ביצירת משתמש");
  }

  const fullUser = await res.json();

  return {
    id: fullUser.id,
    username: user.username
  };
}


// export async function selectTodos() {
//   // localStorage.setItem(
//   //     "currentUser",
//   //     JSON.stringify({ id: 2, fullName: "משתמש לדוגמה" })
//   // );
//   const savedUser = localStorage.getItem("currentUser");
//   const currentUser = savedUser ? JSON.parse(savedUser) : null;
//   try {
//     const res = await fetch(
//       `http://localhost:3000/todos?userId=${currentUser.id}`
//     );
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     return [];
//   }
// }

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

export async function fetchUserData(endpoint) {
  const savedUser = localStorage.getItem("currentUser");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) throw new Error("No current user");

  try {
    const res = await fetch(`http://localhost:3000/${endpoint}?userId=${user.id}`);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return []; // <--- תיקון: מחזירים מערך ריק במקרה שגיאה ולא כלום
  }
}

export async function getPosts() {
  return fetchUserData("posts"); 
}

export async function getTodos() {
  return fetchUserData("todos"); 
}

export async function getAlbums() {
  return fetchUserData("albums"); 
}


// export async function UpdateMarker(id, completed) {
//   try {
//     const res = await fetch(`http://localhost:3000/todos/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ completed }),
//     });
//   } catch (error) {
//     console.error("Error updating todo:", error);
//     throw error;
//   }
// }
// בקובץ api/api.js

// בקובץ api/api.js

export async function getData(id, page = 1, limit = 10) {
  try {
  
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albums=${id}&_page=${page}&_limit=${limit}`);
    
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error(`Error fetching photos for album ${id}:`, error);
    return []; 
  }

}

// api/api.js
// export async function getPhotos(albumId, page = 1, limit = 10) {
//   try {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`);
//     if (!res.ok) throw new Error("Failed to fetch photos");
//     return await res.json();
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// ושאר הפונקציות שלך (getAlbums, deleteData...)
// export async function selectTodos() {
//     // localStorage.setItem(
//     //     "currentUser",
//     //     JSON.stringify({ id: 2, fullName: "משתמש לדוגמה" })
//     // );
//     const savedUser = localStorage.getItem("currentUser");
//     const currentUser = savedUser ? JSON.parse(savedUser) : null;
//     try {
//         const res = await fetch(
//             `http://localhost:3000/todos?userId=${currentUser.id}`
//         );
//         if (!res.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const data = res.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//         return [];
//     }
// }

// export async function toggleCompleted(todo) {
//     const updatedTodo = { ...todo, completed: !todo.completed };
//     try {
//         const res = await fetch(`http://localhost:3000/todos/${todo.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ completed: updatedTodo.completed }),
//         });
//         if (!res.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return await res.json();
//     } catch (error) {
//         console.error("Error updating todo:", error);
//         throw error;
//     }
// }

export async function deleteData(type, id) {
    try {
      
        const res = await fetch(`http://localhost:3000/${type}/${id}`, {
            method: "DELETE",
        }); 
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }  
        return true;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }    
}

export async function updateData(type, id, data) {
    try {
        const res = await fetch(`http://localhost:3000/${type}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return await res.json();
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
}
