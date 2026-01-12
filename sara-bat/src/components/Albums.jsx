import ListPage from "../components/ListPage";
import { getAlbums } from "../api/api"; // פונקציה שמביאה את האלבומים מה-API

function Albums() {
  return (
    <ListPage
      title="Albums"
      fetchData={getAlbums}
      searchableFields={["id", "title"]} // שדות שניתן לחפש בהם
      sortableFields={["id", "title"]}   // שדות שניתן למיין לפי
      showCompleted={false} // אין מצב ביצוע, כמו פוסטים
    />
  );
}

export default Albums;
