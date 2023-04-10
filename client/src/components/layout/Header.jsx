function Header({ user, setUser }) {

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">File Uploader</a>
        <div className="user-info">
          <div className="avatar-img-wrap me-2">
            <img
              src={user.photo}
              className="avatar-img rounded-pill"
              alt="Avatar Logo"
            />
          </div>
          <span className="user-name">{user.name}</span>
          <div className="logout-icon-wrap ms-3">
            <img
              src={"logout.svg"}
              className="logout-icon"
              alt="Logout icon"
              title="logout"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
