import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/contacts" className="navbar-brand">
              CRM Sync
            </Link>
            <ul className="nav-menu">
              <li>
                <Link to="/contacts" className="nav-link">
                  Contacts
                </Link>
              </li>
              <li>
                <Link to="/companies" className="nav-link">
                  Companies
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/" element={<Navigate to="/contacts" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
