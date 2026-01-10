import { useState } from 'react';
function Register() {

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        verifyPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        const res = await fetch(
            `http://localhost:3000/users?username=${formData.name}`
        );

        const users = await res.json();
        if (users.length === 0 && formData.password === formData.verifyPassword) {
    
      navigate("/complete-profile", {
        state: {
          username: formData.username,
          password: formData.password
        }
      });
    } else {
      alert("שם המשתמש כבר קיים");
    }

    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="password"
                name="verifyPassword"
                placeholder="verify-password"
                value={formData.verifyPassword}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">register</button>
        </form>
    );
}


export default Register
