const BASE_URL = "http://localhost:3000";

async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function login(username, password) {
  const users = await request(
    `${BASE_URL}/users?username=${username}&password=${password}`
  );
    const { website, ...userWithoutPassword } = users[0];
  return users.length ? userWithoutPassword : null;
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
   const { website, ...userWithoutPassword } = fullUser;
   return userWithoutPassword;
}

/* ======================
   USER DATA
====================== */
export function getCurrentUser() {
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
export async function searchMany(type, value, fields, baseData = {}) {
  // דוגמה: שלח בקשת GET עם פרמטרים מתאימים
  const params = new URLSearchParams({
    q: value,
    fields: fields.join(","),
    ...baseData
  });
  const res = await fetch(`/api/${type}/search?${params}`);
  if (!res.ok) return [];
  return await res.json();
}
/* ======================
   POSTS
====================== */
// api/api.js

// api/api.js

export async function getList(type,userId, start = 0, limit = 10) {
    try {
        let url = `http://localhost:3000/${type}?_start=${start}&_limit=${limit}`;

        if (userId) {
            url += `&userId=${userId}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${type}`);
        return await res.json();
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
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

export async function getPhotosByAlbum(type, Id, start = 0, limit = 10) {
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

export async function searchOne(
  type,
  value,
  fields = [],
  extraParams = {},
  userId
) {
  try {
    let allResults = [];
    for (const field of fields) {
      const params = new URLSearchParams({
        ...extraParams
      });
      const res = await fetch(
        `${BASE_URL}/${type}?${params.toString()}`
      );
      if (!res.ok) continue;
      const data = await res.json();
      
      // סינון התוצאות על פי הערך
      const filteredResults = data.filter(item => 
        item[field] && item[field].toString().toLowerCase().includes(value.toLowerCase())
      );

      allResults = allResults.concat(filteredResults);
    }
    // הסרת כפילויות לפי id
    const unique = Array.from(new Map(allResults.map(i => [i.id, i])).values());
    return unique;
  } catch (error) {
    console.error("SearchOne error:", error);
    return [];
  }
}
