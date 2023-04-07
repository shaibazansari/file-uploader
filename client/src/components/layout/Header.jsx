function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">File Uploader</a>
        <div className="user-info">
          <div className="avatar-img-wrap me-2">
            <img src={"vite.svg"} className="avatar-img rounded-pill" alt="Avatar Logo" />
          </div>
          <span className="user-name">Shaibaz Ansari</span>
          <div className="logout-icon-wrap ms-3">
            <img src={"logout.svg"} className="logout-icon" alt="Logout icon" title="logout" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;