import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:3000/users?username=${formData.name}&password=${formData.password}`
    );

    const users = await res.json();

    if (users.length > 0) {
      onLogin(users[0]); 
      localStorage.setItem("currentUser", JSON.stringify(users[0]));
      navigate("/home"); 
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="name" placeholder="name" onChange={handleChange} />
      <input name="password" type="password" placeholder="password" onChange={handleChange} />

      <button type="submit">Login</button>


      <p>
        לא רשומה?
        <Link to="/register"> הרשמי כאן</Link>
      </p>
    </form>
  );
}

export default Login;
