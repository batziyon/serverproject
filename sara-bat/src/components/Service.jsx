
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteData } from "../api/api";

// function Service() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state) {
//     return <p>שגיאה: לא התקבלו נתונים</p>;
//   }

//   const { action, type} = state;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (action === "delete") {
//         await deleteData(type, setId);
//       }

//       navigate(-1);
//     } catch (err) {
//       console.error("Service error:", err);
//     }
//   }
//     return (
//         <div style={{ padding: "16px" }}>
//             <h2>
//                 {action === "add" && "הוספה"}
//                 {action === "edit" && "עריכה"}
//                 {action === "delete" && "מחיקה"}
//             </h2>

//             <form onSubmit={handleSubmit}>
//                 {(action === "edit" || action === "delete") && (
//                     <input
//                         type="number"
//                         placeholder="ID"
//                         value={id}
//                         onChange={e => setId(e.target.value)}
//                         required
//                     />
//                 )}

//                 {(action === "add" || action === "edit") && (
//                     <input
//                         type="text"
//                         placeholder="כותרת"
//                         value={title}
//                         onChange={e => setTitle(e.target.value)}
//                         required
//                     />
//                 )}

//                 <button type="submit">
//                     {action === "add" && "הוסף"}
//                     {action === "edit" && "עדכן"}
//                     {action === "delete" && "מחק"}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Service;
