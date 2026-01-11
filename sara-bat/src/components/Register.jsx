
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
        const newUser = await signUp(formData.name, formData.password);

        const authUser = {
          id: newUser.id,
          username: newUser.username
        };

        localStorage.setItem("currentUser", JSON.stringify(authUser));

        navigate("/complete-profile", {
          state: {
            id: newUser.id,
            username: newUser.username
          }
        });

      } catch (error) {
        alert(error.message);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          value={formData.name}
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

        <button type="submit">register</button>
      </form>
    );
  }

  export default Register;
