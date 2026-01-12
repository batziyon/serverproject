import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CompleteProfile from "./components/CompleteProfile";
import Info from "./components/Info";
import Todos from "./components/Todos";
import Posts from "./components/Posts";
import Albums from "./components/Albums";

// קומפוננטה שתגן על Routes
function PrivateRoute({ user, children }) {
  if (!user) {
    // אם המשתמש לא מחובר – נשלח אותו ללוגין
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <p>טוען...</p>;

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/complete-profile"
        element={<CompleteProfile setUser={setUser} />}
      />


      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <Home user={user} />
          </PrivateRoute>
        }
      >
        <Route path="info" element={<Info />} />
        <Route path="todos" element={<Todos />} />
        <Route path="posts" element={<Posts />} />
        <Route path="albums" element={<Albums />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
