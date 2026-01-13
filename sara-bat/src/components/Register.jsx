import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      alert("הסיסמאות לא תואמות");
      return;
    }

    try {
      await signUp(formData.username);

      navigate("/complete-profile", {
        state: {
          username: formData.username,
          password: formData.password
        }
      });
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

      <input
        type="password"
        name="verifyPassword"
        placeholder="verify password"
        value={formData.verifyPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
