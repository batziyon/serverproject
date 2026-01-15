import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../api/api";

function CompleteProfile({ setUser }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { username, password } = state || {};

  const [profile, setProfile] = useState({
    email: "",
    phone: "",
    street: "",
    city: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      email: profile.email,
      phone: profile.phone,
      address: {
        street: profile.street,
        city: profile.city
      }
    };

    try {
      const savedUser = await createUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(savedUser));
      setUser({ username: savedUser.id, user: savedUser });
      navigate(`/users/${savedUser.id}/home`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>השלמת פרטים</h2>

      <input value={username} readOnly />
      <input value={password} readOnly />

      <input
        name="email"
        placeholder="אימייל"
        value={profile.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="טלפון"
        value={profile.phone}
        onChange={handleChange}
        required
      />

      <input
        name="street"
        placeholder="רחוב"
        value={profile.street}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="עיר"
        value={profile.city}
        onChange={handleChange}
      />

      <button type="submit">סיום הרשמה</button>
    </form>
  );
}

export default CompleteProfile;
