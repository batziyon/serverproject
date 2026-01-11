import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../api/api";

function CompleteProfile({ setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { username, password } = location.state || {};

  const [profile, setProfile] = useState({
    name: username || "",
    email: "",
    phone: "",
    website: password || "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    companyName: "",
    catchPhrase: "",
    bs: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" || name === "website") return;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: profile.name,
      username,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      address: {
        street: profile.street,
        suite: profile.suite,
        city: profile.city,
        zipcode: profile.zipcode,
        geo: { lat: "0", lng: "0" }
      },
      company: {
        name: profile.companyName,
        catchPhrase: profile.catchPhrase,
        bs: profile.bs
      }
    };

    try {
      const savedUser = await createUser(newUser);

      localStorage.setItem("currentUser", JSON.stringify(savedUser));
      setUser(savedUser);

      alert("ההרשמה הושלמה בהצלחה!");
      navigate("/home");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>השלמת פרטים</h2>

      <input name="name" value={profile.name} readOnly />
      <input name="website" value={profile.website} readOnly />

      <input name="email" placeholder="אימייל" value={profile.email} onChange={handleChange} required />
      <input name="phone" placeholder="טלפון" value={profile.phone} onChange={handleChange} required />

      <h4>כתובת</h4>
      <input name="street" placeholder="רחוב" value={profile.street} onChange={handleChange} />
      <input name="suite" placeholder="דירה" value={profile.suite} onChange={handleChange} />
      <input name="city" placeholder="עיר" value={profile.city} onChange={handleChange} />
      <input name="zipcode" placeholder="מיקוד" value={profile.zipcode} onChange={handleChange} />

      <h4>חברה</h4>
      <input name="companyName" placeholder="שם החברה" value={profile.companyName} onChange={handleChange} />
      <input name="catchPhrase" placeholder="סלוגן" value={profile.catchPhrase} onChange={handleChange} />
      <input name="bs" placeholder="BS" value={profile.bs} onChange={handleChange} />

      <button type="submit">סיום הרשמה</button>
    </form>
  );
}

export default CompleteProfile;
