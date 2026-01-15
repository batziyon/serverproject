function Info() {
  const data = JSON.parse(localStorage.getItem("currentUser"));
  const user = data;

  if (!user) {
    return <div>אין משתמש מחובר</div>;
  }

  return (
    <div className="info-center">
      <div className="info-content">
        <h2 className="info-title">עמוד מידע</h2>
        <p className="info-greeting">שלום {user.username}!</p>

        <h3 className="info-section">פרטים אישיים</h3>
        <p><span className="info-label">שם:</span> {user.username}</p>
        <p><span className="info-label">מזהה:</span> {user.id}</p>
        <p><span className="info-label">סיסמה:</span> {user.password}</p>
        <p><span className="info-label">דוא"ל:</span> {user.email}</p>

        <h3 className="info-section">כתובת</h3>
        <p><span className="info-label">רחוב:</span> {user.address.street}</p>
        <p><span className="info-label">עיר:</span> {user.address.city}</p>
        <p><span className="info-label">מיקוד:</span> {user.address.zipcode}</p>

        <h3 className="info-section">תקשורת</h3>
        <p><span className="info-label">טלפון:</span> {user.phone}</p>
        <p><span className="info-label">אתר:</span> {user.website}</p>

        <h3 className="info-section">פרטי החברה</h3>
        {/* <p><span className="info-label">שם החברה:</span> {user.company.name}</p> */}
        {/* <p><span className="info-label">מגמה:</span> {user.company.catchPhrase}</p> */}
      </div>
    </div>
  );
}

export default Info;
