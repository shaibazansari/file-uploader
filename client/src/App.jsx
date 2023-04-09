import { useState, useEffect } from "react";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Loader from "./components/utils/Loader";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSetUser = user => {
    setUser(user)
  }

  return loading ? <Loader /> : user ? <Home user={user} /> : <Login handleSetUser={handleSetUser}/>;
}

export default App;
