import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const user="jkl;";
function CompleteProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const { username, password } = location.state || {};

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      ...profile
    };
   

    console.log("משתמש חדש:", newUser);

    // בפרויקט אמיתי → POST
    alert("ההרשמה הושלמה בהצלחה!");

    navigate("/Home");
  };

  if (!username) {
    return <p>אין גישה לדף זה</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>השלמת פרטים</h2>

      <input
        name="fullName"
        placeholder="שם מלא"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="אימייל"
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="טלפון"
        onChange={handleChange}
        required
      />

      <button type="submit">סיום הרשמה</button>
    </form>
  );
}

export default CompleteProfile;
