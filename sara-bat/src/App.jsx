import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import CompleteProfile from "./components/CompleteProfile";
import Home from "./components/Home";
import Info from "./components/Info";

import TodosPage from "./components/TodosPage";
import PostsPage from "./components/PostsPage";
import AlbumsPage from "./components/AlbumsPage";
import PhotoItem from "./components/PhotoItem";

// Route מוגן
function PrivateRoute({ user, children }) {
  if (!user) {
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

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <Routes>
      {/* ציבורי */}
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/complete-profile"
        element={<CompleteProfile setUser={setUser} />}
      />

      {/* מוגן */}
      {/* <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <Home user={user} />
          </PrivateRoute>
        }
      >
        <Route index element={<Info />} />
        <Route path="info" element={<Info />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="posts" element={<PostsPage />} />  
        <Route path="albums" element={<AlbumsPage />} />
      </Route> */}
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <Home user={user} />
          </PrivateRoute>
        }
      >
        <Route index element={<Info />} />

        <Route path="users/:userId">
          <Route index element={<Info />} />

          <Route path="todos" element={<TodosPage />} />
          <Route path="posts" element={<PostsPage />} />

          <Route path="albums">
            <Route index element={<AlbumsPage />} />
            <Route path=":albumId">
              <Route index element={<AlbumsPage />} />
              {<Route path="photos" element={<AlbumsPage />} />}
            </Route>
          </Route>
        </Route>
      </Route>


      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
