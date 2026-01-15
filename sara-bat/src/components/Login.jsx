import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    


    try {
      const user = await login(formData.username, formData.password);

      if (!user) {
        alert("שם משתמש או סיסמה שגויים");
        return;
      }

      const authUser = {
        // id: user.id,
        // username: user.username
        user
      };

      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin({ username: user.username, id: user.id });
      console.log( user);
      navigate(`/users/${user.id}/home`);

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>

      <p>
        לא רשום?
        <Link to="/register"> הרשם כאן</Link>
      </p>
    </form>
  );
}

export default Login;
