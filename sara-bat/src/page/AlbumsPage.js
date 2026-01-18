// import { useParams, Navigate } from "react-router-dom";
// import ListPage from "../components/ListPage";
// import AlbumItem from "../components/items/AlbumItem";
// import { getAlbums,getCurrentUser } from "../api/api";

// export default function AlbumsPage() {
//   const { userId } = useParams();
// const currentUser = getCurrentUser();
//   if (userId !== currentUser.id) {
//     alert("אין לך גישה לעמוד זה.");
//         return <Navigate to={`http://localhost:5173/users/${currentUser.id}/home`} />; // החזר לדף הבית אם ID שונה
//   }

//   const updateAlbum = (item, newTitle) => {
//     return { ...item, title: newTitle };
//   };

//   const fetchMyAlbums = async (page, limit) => {
//     const start = (page - 1) * limit;
//     return await getAlbums(userId, start, limit);
//   };

//   return (
//     <ListPage
//       title="Albums"
//       fetchData={fetchMyAlbums}
//       limit={10}
//       baseData={{ userId: parseInt(userId) }}
//       backPath={`/users/${userId}/home`}
//       endMessage="-- אין עוד אלבומים --"
//       addItemFields={[
//         { key: "title", placeholder: "שם האלבום החדש" }
//       ]}
//       searchableFields={["title", "id"]}
//       sortableFields={["id", "title"]}
//       onUpdate={updateAlbum}
//       renderItem={(item, del, _toggle, update) => (
//         <AlbumItem
//           key={item.id}
//           item={item}
//           onDelete={del}
//           onChange={update}
//         />
//       )}
//     />
//   );
// }