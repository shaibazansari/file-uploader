import { useEffect } from "react";

const CLIENT_ID = "447235254500-rb8ssec8iu96cqqjnef09mee6ksp1aa3.apps.googleusercontent.com";

function Login({ handleSetUser }) {
  const handleSuccess = async (data) => {
    console.log(data);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: data.credential }),
    });

    if (response.ok) {
      const data = await response.json();
      handleSetUser(data.user)
    }
  };
  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleSuccess,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        type: "standard",
        theme: "filled_black",
        text: "continue_with",
        shape: "pill",
      });
    }
  }, []);

  return (
    <div className="container h-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="card login-card">
          <div className="card-body text-center">
            <h2 className="mb-3">Login</h2>
            <div className="login-button ">
              <div id="signUpDiv" data-text="signup_with"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
