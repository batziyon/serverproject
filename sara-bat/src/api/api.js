const BASE_URL = "http://localhost:3000";

/* ======================
   פונקציית עזר כללית
====================== */
async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

/* ======================
   AUTH
====================== */
export async function login(username, password) {
  const users = await request(
    `${BASE_URL}/users?username=${username}&password=${password}`
  );
  return users.length ? users[0] : null;
}

export async function signUp(username) {
  const users = await request(
    `${BASE_URL}/users?username=${encodeURIComponent(username)}`
  );
  if (users.length) throw new Error("שם משתמש כבר קיים");
}

export async function createUser(user) {
  if (!user.username) throw new Error("חסר שם משתמש");

  const fullUser = await request(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

   console.log({ id: fullUser.id, username: user.username });
   console.log(fullUser);
   
   return fullUser;
}

/* ======================
   USER DATA
====================== */
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  if (!user) throw new Error("No current user");
  return JSON.parse(user);
}

export async function fetchUserData(endpoint) {
  try {
    const user = getCurrentUser();
    return await request(`${BASE_URL}/${endpoint}?userId=${user.id}`);
  } catch {
    return [];
  }
};

export async function toggleCompleted(todo) {
  return request(`${BASE_URL}/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !todo.completed })
  });
}

/* ======================
   POSTS
====================== */
// api/api.js

// api/api.js

export async function getPosts(userId, start = 0, limit = 10) {
    try {
        // --- שינוי קריטי: החלפנו את הכתובת לשרת המקומי ---
        let url = `http://localhost:3000/posts?_start=${start}&_limit=${limit}`;
        
        if (userId) {
            url += `&userId=${userId}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch posts");
        return await res.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function getAlbums(userId, start = 0, limit = 10) {
  try {
    // בניית הכתובת: פונים לשרת המקומי (כדי שהוספות יישמרו)
    // ומוסיפים תמיכה ב-_start ו-_limit
    let url = `http://localhost:3000/albums?_start=${start}&_limit=${limit}`;
    
    // אם שלחנו userId, מסננים לפי המשתמש
    if (userId) {
      url += `&userId=${userId}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch albums");
    return await res.json();
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}

export async function updateAlbum(id, title) {
  return updateData("albums", id, { title });
}

/* ======================
   PHOTOS
====================== */
// 

// api/api.js

export async function getPhotosByAlbum(albumId, start = 0, limit = 10) {
  try {
    const res = await fetch(
      `${BASE_URL}/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch photos");
    return await res.json();
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}


export async function getCommentsByPost(postId, start = 0, limit = 10) {
  try {
    const res = await fetch(
      `${BASE_URL}/comments?postId=${postId}&_start=${start}&_limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch comments");
    return await res.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}


/* ======================
   CRUD כללי
====================== */
export async function updateData(type, id, payload) {
  return request(`${BASE_URL}/${type}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function deleteData(type, id) {
  await request(`${BASE_URL}/${type}/${id}`, { method: "DELETE" });
  return true;
}

export async function createData(type, payload) {
  console.log("Creating data:", type, payload);
  return request(`${BASE_URL}/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}


// api/api.js

export async function getTodos(userId, start = 0, limit = 10) {
  try {
    // בניית הכתובת עם תמיכה בטעינה חלקית (_start, _limit)
    // אנו פונים לשרת המקומי (localhost:3000) כדי שהנתונים יישמרו
    let url = `http://localhost:3000/todos?_start=${start}&_limit=${limit}`;
    
    // אם שלחנו userId, נוסיף סינון (אחרת זה יביא את המטלות של כולם)
    if (userId) {
      url += `&userId=${userId}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return await res.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}
export async function searchOne(
  type,
  value,
  fields = [],
  extraParams = {}
) {
  try {
    for (const field of fields) {
      const params = new URLSearchParams({
        [field]: value,
        ...extraParams
      });

      const res = await fetch(
        `${BASE_URL}/${type}?${params.toString()}`
      );

      if (!res.ok) continue;

      const data = await res.json();
      if (data.length) {
        return data[0]; // בדיוק כמו login
      }
    }

    return null;
  } catch (error) {
    console.error("SearchOne error:", error);
    return null;
  }
}
