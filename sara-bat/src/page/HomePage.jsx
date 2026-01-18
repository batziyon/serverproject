import { Navigate, useParams } from "react-router-dom";

function HomePage() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    // const user = userData?.user;
    const { userId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if ((userId) !== currentUser.id) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <h1>ברוכים הבאים, {user?.username || "משתמש"}!</h1>
            <p>כאן תוכלו לנהל את התוכן האישי שלכם באתר בצורה נוחה ומהירה.</p>

            <h2>מה אפשר לעשות?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h3>אלבומים</h3>
                    <p>צפו בכל האלבומים שיצרתם ושמרתם.</p>
                </div>

                <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h3>תמונות</h3>
                    <p>צפו בכל התמונות שלכם מתוך האלבומים.</p>
                </div>

                <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h3>הודעות</h3>
                    <p>בדקו את ההודעות והתגובות שלכם באתר.</p>
                </div>

                <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h3>משימות</h3>
                    <p>עקבו אחרי המשימות שלכם והתקדמותן.</p>
                </div>
            </div>

            <p style={{ marginTop: "30px", fontStyle: "italic" }}>
                לחצו על התפריט למעלה כדי לגשת לכל אחד מהחלקים.
            </p>
        </div>
    );
}

export default HomePage;
