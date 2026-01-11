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


// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("currentUser");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <p>טוען...</p>;
//   }
function App() {
  // אתחול user עם ערך דיפולטי כדי לא לקרוס
  const [user, setUser] = useState({
    fullName: "משתמש לדוגמה",
    username: "testuser"
  });

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />}>
        <Route path="/home" element={<Home user={user} />} />
        <Route path="info" element={<Info />} />
        <Route path="todos" element={<Todos />} />
        <Route path="posts" element={<Posts />} />
        <Route path="albums" element={<Albums />} />
      </Route>
      <Route path="/complete-profile" element={<CompleteProfile user={user} />} />
    </Routes>
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={user ? <Navigate to="/home" /> : <Login onLogin={setUser} />}
    //       />

    //       <Route
    //         path="/register"
    //         element={user ? <Navigate to="/home" /> : <Register />}
    //       />
    //       <Route path="/complete-profile" 
    //          element={user ? <Navigate to="/complete-profile" /> : <CompleteProfile />}
    // />
    //       <Route
    //         path="/home"
    //         element={user ? <Home user={user} /> : <Navigate to="/" />}
    //       />
    //     </Routes>
  );
}

export default App;
