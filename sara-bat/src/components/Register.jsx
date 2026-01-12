
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
      await signUp(formData.name); // בודקים אם שם משתמש פנוי

      // משתמש חדש עדיין לא נוצר, אבל אפשר לשלוח את הנתונים להמשך
      navigate("/complete-profile", {
        state: {
          username: formData.name,
          password: formData.password
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
