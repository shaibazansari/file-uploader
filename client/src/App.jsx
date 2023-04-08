import { useState, useEffect } from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.error("Failed to fetch files");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return user ? <Home user={user} /> : <Login setUser={setUser}/>;
}

export default App;
