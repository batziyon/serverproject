import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login(formData.name, formData.password);

      if (!user) {
        alert("שם משתמש או סיסמה שגויים");
        return;
      }

      const authUser = {
        id: user.id,
        username: user.username
      };

      localStorage.setItem("currentUser", JSON.stringify(authUser));
      onLogin(authUser);
      navigate("/home");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        name="name"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>

      <p>
        לא רשומה?
        <Link to="/register"> הרשמי כאן</Link>
      </p>
    </form>
  );
}

export default Login;
