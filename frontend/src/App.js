import { useState } from "react";
import "./App.css";
import sunImage from "./assets/sun.jpg";
import PatientBooking from "./pages/PatientBooking";
import BookingSuccess from "./pages/BookingSuccess";
import MyAppointments from "./pages/MyAppointments";
import Dashboard from "./pages/Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("login");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.role === "patient") {
        localStorage.setItem("user", JSON.stringify(data));
        setPage("patient");
      }
      if (response.ok && data.role === "receptionist") {
        localStorage.setItem("user", JSON.stringify(data));
        setPage("dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  if (page === "patient") {
    return <PatientBooking setPage={setPage} />;
  }

  if (page === "success") {
    return <BookingSuccess setPage={setPage} />;
  }

  if (page === "appointments") {
    return <MyAppointments />;
  }

  if (page === "dashboard") {
    return <Dashboard setPage={setPage} />;
  }

  return (
    <div className="page">
      <div className="login-screen">
        <div className="logo-area">
          <div className="brand-name">Sunny Bite</div>
          <div className="brand-subtitle">DENTAL</div>
          <img src={sunImage} alt="Sunny Bite logo" className="sun-image" />
        </div>

        <h2>Welcome!</h2>
        <p className="login-text">Log in to your account to continue</p>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>

        <div className="demo-accounts">
          <p className="demo-title">Demo accounts</p>
          <p>
            <strong>Patient 1:</strong> kevin@email.com
          </p>
          <p>
            <strong>Patient 2:</strong> jonathan@email.com
          </p>
          <p>
            <strong>Receptionist:</strong> rajesh@email.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
