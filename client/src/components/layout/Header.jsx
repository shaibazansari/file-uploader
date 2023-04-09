function Header({ user }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">File Uploader</a>
        <div className="user-info">
          <div className="avatar-img-wrap me-2">
            <img src={user.photo} className="avatar-img rounded-pill" alt="Avatar Logo" />
          </div>
          <span className="user-name">{ user.name }</span>
          <div className="logout-icon-wrap ms-3">
            <img src={"logout.svg"} className="logout-icon" alt="Logout icon" title="logout" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
