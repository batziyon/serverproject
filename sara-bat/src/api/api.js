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

  return { id: fullUser.id, username: user.username };
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
}

/* ======================
   TODOS
====================== */
export async function getTodos() {
  return request(`${BASE_URL}/todos`);
}

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
export async function getPosts() {
  return request(`${BASE_URL}/posts`);
}

/* ======================
   ALBUMS
====================== */
export async function getAlbums() {
  return fetchUserData("albums");
}

export async function updateAlbum(id, title) {
  return updateData("albums", id, { title });
}

/* ======================
   PHOTOS
====================== */
// 

export async function getPhotosByAlbum(albumId, page = 1, limit = 10) {
  return request(
    `${BASE_URL}/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`
  );
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
  return request(`${BASE_URL}/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}
