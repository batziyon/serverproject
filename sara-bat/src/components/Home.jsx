import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Home({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h1>{user.username}</h1>
      </header>

      <nav>
        <NavLink to={`/users/${user.id}/info`}>Info</NavLink> |{" "}
        <NavLink to={`/users/${user.id}/todos`}>Todos</NavLink> |{" "}
        <NavLink to={`/users/${user.id}/posts`}>Posts</NavLink> |{" "}
        <NavLink to={`/users/${user.id}/albums`}>Albums</NavLink> |{" "}
        <button onClick={handleLogout}>Logout</button>

      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
