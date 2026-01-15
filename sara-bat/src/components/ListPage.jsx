import { useEffect, useState } from "react"; // ייבוא הוקים לניהול מצב (State) ופעולות לוואי (Effects) מריאקט
import { useNavigate, useParams } from "react-router-dom"; // ייבוא הוקים לניווט בין דפים ושליפת פרמטרים מהכתובת
import { toggleCompleted, updateData, deleteData, createData } from "../api/api"; // ייבוא פונקציות API לתקשורת עם השרת (מחיקה, עדכון, יצירה)

// הגדרת הקומפוננטה ListPage - זו קומפוננטה גנרית שמקבלת הרבה הגדרות מה"אבא" (כמו TodosPage או PostsPage)
function ListPage({
  title, // הכותרת שתוצג בראש הדף (למשל "Todos" או "Posts")
  fetchData,
  searchableFields = [], // מערך של שדות שבהם אפשר לחפש (למשל title, body)
  sortableFields = [], // מערך של שדות שלפיהם אפשר למיין
  renderItem, // פונקציה שמציירת פריט בודד (TodoItem או PostItem) - האבא שולח אותה
  showExtraSearchButton, // האם להציג כפתור סינון נוסף (כמו "הושלם/לא הושלם")
  option, // האפשרויות לסינון הנוסף (למשל ["all", "done"])
  onUpdate, // פונקציה שמטפלת בעדכון פריט (הלוגיקה הספציפית לכל סוג פריט)
  addItemFields = [{ key: "title", placeholder: "כותרת" }], // שדות להוספה חדשה. ברירת מחדל: רק כותרת. בפוסטים האבא ישלח גם body.
  baseData = {}, // נתונים בסיסיים להוספה (למשל userId או albumId שצריך להוסיף לכל פריט חדש)
  limit = 10, // כמה פריטים לטעון בכל "נגלה" (ברירת מחדל 10)
  backPath, // נתיב לחזור אליו כלוחצים על "חזור" (אופציונלי, למשל מתמונות לאלבומים)
}) {
  const navigate = useNavigate(); // יצירת פונקציית הניווט (כדי לעבור דפים בקוד)
  const { userId } = useParams(); // שליפת ה-userId מתוך הכתובת (למשל מ- /users/1/todos)

  const [items, setItems] = useState([]); // המקום שבו נשמרים כל הפריטים שהבאנו מהשרת
  const [filtered, setFiltered] = useState([]); // המקום שבו נשמרים הפריטים שמוצגים כרגע (אחרי חיפוש/סינון)
  const [page, setPage] = useState(1); // באיזה עמוד אנחנו כרגע (לטעינה מדורגת)
  const [hasMore, setHasMore] = useState(true); // האם נשארו עוד פריטים לטעון בשרת?
  const [isLoading, setIsLoading] = useState(false); // האם אנחנו באמצע טעינה? (כדי להציג "טוען...")
  const [searchValue, setSearchValue] = useState(""); // הטקסט שהמשתמש כתב בתיבת החיפוש
  const [searchField, setSearchField] = useState(searchableFields[0] || "all"); // לפי איזה שדה מחפשים (ברירת מחדל: הכל)
  const [newItems, setNewItems] = useState([]); // מערך לשמירת השורות החדשות שהמשתמש רוצה להוסיף (לפני שליחה)

  // --- פונקציית הטעינה ---
  const loadData = async (pageNum) => {
    setIsLoading(true);
    const data = await fetchData(pageNum, limit);
    if (data.length < limit) setHasMore(false);
    //לסדר את הכפילויות
    if (pageNum === 1) {
      setItems(data);
      setFiltered(data);
    } else {
      setItems(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const uniqueNewItems = data.filter(item => !existingIds.has(item.id));
        return [...prev, ...uniqueNewItems];
      });
      setFiltered(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const uniqueNewItems = data.filter(item => !existingIds.has(item.id));
        return [...prev, ...uniqueNewItems];
      });
    }
  setIsLoading(false);
};

useEffect(() => {
  setPage(1);
  setHasMore(true);
  loadData(1);
}, [fetchData]);

const handleLoadMore = () => { // פונקציה שמופעלת בלחיצה על "טען עוד"
  const nextPage = page + 1; // מחשבים את העמוד הבא
  setPage(nextPage); // מעדכנים את ה-state של העמוד
  loadData(nextPage); // קוראים לטעינה עם העמוד החדש
};

// --- לוגיקת החיפוש (כולל תיקון ל-All) ---
useEffect(() => { // אפקט שרץ כל פעם שהחיפוש, שדה החיפוש או הפריטים משתנים
  if (searchField === "all") { // אם המשתמש בחר לחפש ב"הכל"
    // חיפוש בכל השדות של האובייקט
    setFiltered(items.filter(item => // מסננים את הרשימה המקורית
      Object.values(item).some(val => // בודקים האם *איזשהו* ערך בתוך האובייקט (title, body וכו')
        String(val).toLowerCase().includes(searchValue.toLowerCase()) // מכיל את הטקסט שהמשתמש כתב (בהתעלם מאותיות גדולות)
      )
    ));
  } else { // אם המשתמש בחר שדה ספציפי (למשל רק title)
    // חיפוש בשדה ספציפי
    setFiltered(items.filter(item => // מסננים
      String(item[searchField]).toLowerCase().includes(searchValue.toLowerCase()) // בודקים רק את השדה הנבחר
    ));
  }
}, [searchValue, searchField, items]); // האפקט תלוי במשתנים האלו

// ... (שאר הפונקציות: sort, update, toggle, delete נשארות זהות) ...
const handleSort = (field) => { // מיון הרשימה
  setFiltered([...filtered].sort((a, b) => String(a[field]).localeCompare(String(b[field])))); // מיון אלפביתי לפי השדה שנבחר
};
const handleUpdate = async (...args) => { // עדכון פריט
  const payload = onUpdate(...args); // מכינים את המידע לעדכון בעזרת הפונקציה מהאבא
  const updated = await updateData(title.toLowerCase(), args[0].id, payload); // שולחים בקשת עדכון לשרת (PUT/PATCH)
  setItems(prev => prev.map(i => i.id === updated.id ? updated : i)); // מעדכנים את הפריט ברשימה המקורית
  setFiltered(prev => prev.map(i => i.id === updated.id ? updated : i)); // מעדכנים את הפריט ברשימה המסוננת
};
const handleToggle = async (todo) => { // שינוי סטטוס (למשל צ'קבוקס ב-Todo)
  const updated = await toggleCompleted(todo); // קריאה ל-API לשינוי הסטטוס
  setItems(prev => prev.map(i => i.id === updated.id ? updated : i)); // עדכון ב-state
  setFiltered(prev => prev.map(i => i.id === updated.id ? updated : i)); // עדכון ב-filtered
};
const handleDelete = async (id) => { // מחיקת פריט
  await deleteData(title.toLowerCase(), id); // קריאה ל-API למחיקה מהשרת
  setItems(prev => prev.filter(i => i.id !== id)); // הסרה מהרשימה המקורית
  setFiltered(prev => prev.filter(i => i.id !== id)); // הסרה מהרשימה המוצגת
};
const handleExtraSearch = (completed) => { // סינון נוסף (כמו "הושלם")
  if (completed === "all") return setFiltered(items); // אם נבחר "הכל", מחזירים את כל הרשימה
  setFiltered(items.filter(item => item.completed === (completed === "done"))); // אחרת, מסננים לפי הבוליאני (true/false)
};

// --- לוגיקה להוספת שורות ---
const addNewRow = () => { // הוספת שורה ריקה למילוי
  const initialItem = {}; // יוצרים אובייקט ריק
  addItemFields.forEach(field => initialItem[field.key] = ""); // ממלאים אותו במפתחות ריקים לפי השדות שהוגדרו (title, body...)
  setNewItems(prev => [...prev, initialItem]); // מוסיפים למערך הפריטים החדשים
};
const handleChangeRow = (index, field, value) => { // עדכון טקסט בתוך שורת הוספה
  setNewItems(prev => { // מעדכנים את ה-state
    const copy = [...prev]; // מעתיקים את המערך (כדי לא לשנות ישירות)
    copy[index][field] = value; // משנים את השדה הספציפי בשורה הספציפית
    return copy; // מחזירים את המערך המעודכן
  });
};
const handleAddAll = async () => { // שמירת כל הפריטים החדשים לשרת
  const firstFieldKey = addItemFields[0].key; // לוקחים את שם השדה הראשון (למשל title) לבדיקה
  const itemsToAdd = newItems.filter(i => i[firstFieldKey]); // מסננים שורות ריקות (שלא כתבו בהן כלום)
  if (itemsToAdd.length === 0) return; // אם אין מה להוסיף, יוצאים
  try {
    const resourceName = title.toLowerCase(); // הופכים את הכותרת לאותיות קטנות (למשל "Posts" -> "posts") בשביל ה-API
    const createdItems = await Promise.all( // מחכים שכל הבקשות לשרת יסתיימו
      itemsToAdd.map(item => createData(resourceName, { ...item, ...baseData })) // שולחים בקשת יצירה לכל פריט, ומוסיפים לו מידע בסיסי (כמו userId)
    );
    setItems(prev => [...prev, ...createdItems]); // מוסיפים את הפריטים שנוצרו לרשימה המקורית
    setFiltered(prev => [...prev, ...createdItems]); // מוסיפים לרשימה המוצגת
    setNewItems([]); // מנקים את שורות ההוספה
  } catch (error) {
    alert("שגיאה ביצירת הפריטים"); // הודעת שגיאה למשתמש
  }
}

return (
  <div>
    {/* --- אזור הכפתורים העליון --- */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>

      {/* כפתור הבית הקבוע - מופיע תמיד אם יש userId */}
      {userId && ( // בודקים אם יש userId (אם אנחנו בתוך פרופיל משתמש)
        <button
          onClick={() => navigate(`/users/${userId}`)} // לחיצה מנווטת לדף המשתמש הראשי
          style={{ backgroundColor: "#2196f3" }} // צבע כחול
        >
          🏠 דף הבית
        </button>
      )}

      {/* כפתור חזור ספציפי (למשל מתמונות לאלבומים) */}
      {backPath && ( // בודקים אם האבא שלח נתיב חזרה
        <button
          onClick={() => navigate(backPath)} // לחיצה מנווטת לנתיב הזה
          style={{ backgroundColor: "#757575" }} // צבע אפור
        >
          🡨 חזור לרשימה
        </button>
      )}
    </div>

    <h2>{title}</h2> {/* מציג את הכותרת (למשל "Todos") */}

    <div style={{ marginBottom: "20px" }}> {/* אזור החיפוש והמיון */}
      <select onChange={e => setSearchField(e.target.value)} value={searchField}> {/* בחירת שדה לחיפוש */}
        {searchableFields.map(f => <option key={f} value={f}>{f}</option>)} {/* יצירת האפשרויות בתפריט */}
      </select>
      <input
        placeholder="חיפוש..."
        value={searchValue} // קושר ל-state של החיפוש
        onChange={e => setSearchValue(e.target.value)} // מעדכן את ה-state בכל הקשה
      />
      {showExtraSearchButton && // אם האבא ביקש כפתור סינון נוסף
        <select onChange={e => handleExtraSearch(e.target.value)}> {/* תפריט סינון נוסף */}
          {option.map(f => <option key={f} value={f}>{f}</option>)} {/* האפשרויות שהאבא שלח */}
        </select>
      }
      <select onChange={e => handleSort(e.target.value)}> {/* תפריט מיון */}
        {sortableFields.map(f => <option key={f} value={f}>{f}</option>)} {/* שדות המיון שהאבא שלח */}
      </select>
    </div>

    {!filtered.length && !isLoading && <h2>אין תוצאות</h2>} {/* אם הרשימה ריקה וסיימנו לטעון, מציג הודעה */}

    <ul style={{ listStyle: "none", padding: 0 }}> {/* רשימת הפריטים */}
      {filtered.map(item => ( // רצים על המערך המסונן
        <li key={item.id}> {/* לכל פריט חייב להיות מפתח ייחודי (key) */}
          {renderItem(item, handleDelete, handleToggle, handleUpdate)} {/* קוראים לפונקציה מהאבא כדי לצייר את הפריט (TodoItem/PostItem) */}
        </li>
      ))}
    </ul>

    <div style={{ margin: "20px 0", textAlign: "center" }}> {/* אזור כפתור "טען עוד" */}
      {isLoading && <p>טוען עוד נתונים...</p>} {/* מציג הודעה בזמן טעינה */}
      {!isLoading && hasMore && ( // אם לא טוענים ויש עוד מה לטעון
        <button onClick={handleLoadMore} style={{ width: "100%", padding: "10px" }}>
          טען עוד
        </button>
      )}
      {!isLoading && !hasMore && items.length > 0 && ( // אם לא טוענים ואין יותר מה לטעון
        <p style={{ color: "#888" }}>-- אין עוד פריטים להציג --</p>
      )}
    </div>

    <hr /> {/* קו מפריד */}

    <button onClick={addNewRow}>הוסף שורה חדשה</button> {/* כפתור להוספת אינפוטים חדשים */}

    {/* לולאה שמציירת את שדות ההוספה החדשים */}
    {newItems.map((item, index) => (
      <div key={index} style={{ marginTop: "8px", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", maxWidth: "400px" }}>
        {/* לולאה פנימית שמציירת אינפוט לכל שדה שהוגדר (title, body וכו') */}
        {addItemFields.map(field => (
          <input
            key={field.key} // מפתח ייחודי לשדה
            type="text"
            placeholder={field.placeholder} // טקסט עזרה
            value={item[field.key] || ""} // הערך הנוכחי
            onChange={e => handleChangeRow(index, field.key, e.target.value)} // עדכון בעת שינוי
            style={{ width: "100%", marginBottom: "8px", display: "block" }}
          />
        ))}
      </div>
    ))}

    {/* כפתור שמירה שמופיע רק אם יש שורות חדשות */}
    {newItems.length > 0 && <button onClick={handleAddAll} style={{ marginTop: "8px" }}>הוסף את כל הפריטים</button>}
  </div>
);
}
export default ListPage; // מייצא את הקומפוננטה כדי שדפים אחרים יוכלו להשתמש בה