import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Home from './Home';
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await fetch(
      `http://localhost:3000/users?username=${formData.name}&website=${formData.password}`
    );

    const users = await result.json();
    //לבנות מערך משתמשים

    if (users.length > 0) {
      alert(`התחברות הצליחה! שלום ${users[0].name}`);
      localStorage.setItem('curentUser', JSON.stringify(users[0]));

      navigate("/Home");
    } else {
      alert("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
  );

}

export default Login;
