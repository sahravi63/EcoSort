import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainApp from "./pages/mainPage/MainApp";
import Login from "./pages/Login/AuthForm"; 

function App() {
  // Load logged-in user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Handler to update user on login/signup
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Dashboard is the default first render */}
          <Route path="/" element={<MainApp user={user} setUser={setUser} />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Login onLogin={handleLogin} />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<MainApp user={user} setUser={setUser} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
