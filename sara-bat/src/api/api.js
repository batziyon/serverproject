

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


export async function signUp(username, password) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    throw new Error("שגיאה בהרשמה");
  }

  return res.json();
}


export async function createUser(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error("שגיאה ביצירת משתמש");
  }

  return res.json();
}
