const BASE_URL = "http://localhost:3000";

async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function login(username, password) {
  try {
    const users = await request(
      `${BASE_URL}/users?username=${username}&password=${password}`
    );
    const { website, ...userWithoutPassword } = users[0];
    return users.length ? userWithoutPassword : null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function signUp(username) {
  try {
    const users = await request(
      `${BASE_URL}/users?username=${encodeURIComponent(username)}`
    );
    if (users.length) throw new Error("שם משתמש כבר קיים");
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
}

export async function createUser(user) {
  try {
    if (!user.username) throw new Error("חסר שם משתמש");
    const fullUser = await request(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    const { website, ...userWithoutPassword } = fullUser;
    return userWithoutPassword;
  } catch (error) {
    console.error("CreateUser error:", error);
    throw error;
  }
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem("currentUser");
    if (!user) throw new Error("No current user");
    return JSON.parse(user);
  } catch (error) {
    console.error("GetCurrentUser error:", error);
    return null;
  }
}

export async function fetchUserData(endpoint) {
  try {
    const user = getCurrentUser();
    return await request(`${BASE_URL}/${endpoint}?userId=${user.id}`);
  } catch (error) {
    console.error("FetchUserData error:", error);
    return [];
  }
}

export async function toggleCompleted(todo) {
  try {
    return await request(`${BASE_URL}/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed })
    });
  } catch (error) {
    console.error("ToggleCompleted error:", error);
    throw error;
  }
}

export async function getList(type, userId, start = 0, limit = 10) {
  try {
    let url = `${BASE_URL}/${type}?_start=${start}&_limit=${limit}`;
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

export async function getInnerList(to, from, Id, start = 0, limit = 10) {
  try {
    const res = await fetch(
      `${BASE_URL}/${to}?${encodeURIComponent(from)}=${encodeURIComponent(Id)}&_start=${start}&_limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch photos");
    return await res.json();
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}

export async function updateData(type, id, payload) {
  try {
    return await request(`${BASE_URL}/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("UpdateData error:", error);
    throw error;
  }
}

export async function deleteData(type, id) {
  try {
    await request(`${BASE_URL}/${type}/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("DeleteData error:", error);
    throw error;
  }
}

export async function createData(type, payload) {
  try {
    return await request(`${BASE_URL}/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("CreateData error:", error);
    throw error;
  }
}

export async function searchOne(
  type,
  value,
  fields = [],
  extraParams = {},
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
      const filteredResults = data.filter(item => 
        item[field] && item[field].toString().toLowerCase().includes(value.toLowerCase())
      );
      allResults = allResults.concat(filteredResults);
    }
    const unique = Array.from(new Map(allResults.map(i => [i.id, i])).values());
    return unique;
  } catch (error) {
    console.error("SearchOne error:", error);
    return [];
  }
}
