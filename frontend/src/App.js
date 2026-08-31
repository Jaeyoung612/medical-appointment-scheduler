import './App.css';
import sunImage from './assets/sun.jpg';

function App() {
  return (
    <div className="page">
      <div className="login-screen">

        <div className="logo-area">
          <div className="brand-name">Sunny Bite</div>
          <div className="brand-subtitle">DENTAL</div>
          <img 
          src={sunImage}
          alt="Sunny Bite logo"
          className='sun-image'
          />
        </div>

        <h2>Welcome!</h2>
        <p className="login-text">Log in to your account to continue</p>

        <div className="form-group">
          <label>Email</label>

          <input type="email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" />
        </div>

        <button className="login-button">
          Log in
        </button>

        <div className="demo-accounts">
          <p className="demo-title">Demo accounts</p>
          <p><strong>Patient 1:</strong> kevin@email.com</p>
          <p><strong>Patient 2:</strong> jonathan@email.com</p>
          <p><strong>Receptionist:</strong> rajesh@email.com</p>
          </div>
        </div>
    </div>
  );
}

export default App;
