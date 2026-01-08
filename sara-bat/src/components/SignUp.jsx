// import { useState } from 'react';
// function SignUp() {

//   const [formData, setFormData] = useState({
//     name: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSignUp = async (e) => {
    
//     e.preventDefault();

//     const res = await fetch(
//       `http://localhost:3000/users?username=website=${formData.password}`
//     );

//     const users = await res.json();

//     if (users.length < 0) {
//       alert(`ההרשמה הצליחה! שלום ${users[0].name}`);
//     } else {
//       alert("שם משתמש או סיסמה שגויים");
//     }
//   };

//   return (
//     <form onSubmit={handleSignUp}>
//       <input
//         type="text"
//         name="name"
//         placeholder="name"
//         value={formData.name}
//         onChange={handleChange}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="password"
//         value={formData.password}
//         onChange={handleChange}
//       />

//       <button type="submit">SignUp</button>
//     </form>
//   );
// }


// export default SignUp
