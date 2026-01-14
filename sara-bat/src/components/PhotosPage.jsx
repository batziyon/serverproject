// import ListPage from "../components/ListPage";
// import PhotoItem from "../components/PhotoItem";
// import { getPhotos } from "../api/api";

// export default function PhotosPage() {
//   const updatePhoto = (item, newTitle) => ({
//     albumId: item.albumId,
//     id: item.id,
//     title: newTitle,
//     url: item.url,
//     thumbnailUrl: item.thumbnailUrl
//   });

//   return (
//     <ListPage
//       title="Photos"
//       fetchData={getPhotos}
//       searchableFields={["all", "id", "title"]}
//       sortableFields={["id", "title"]}
//       onUpdate={updatePhoto}
//       renderItem={(item, del, _toggle, update) => (
//         <PhotoItem
      
//         />
//       )}
//       addBody={false}
//       addPhoto={false}
//       showExtraSearchButton={true}
//     />
//   );
// }
