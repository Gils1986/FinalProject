import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <img style={{height: "25px"}} src={"/favicon.ico"} alt={"gift"} />
            <span className="navbar-brand ms-1 mt-1">The Perfect Gift</span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link style={{color: "white"}} className="nav-link mt-1" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link style={{color: "white"}} className="nav-link mt-1" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              {user ? (
                <li className="nav-item">
                  <Link style={{color: "white"}} className="nav-link mt-1" to="/signOut">
                    Sign Out
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link style={{color: "white"}} className="nav-link mt-1" to="/signIn">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link style={{color: "white"}} className="nav-link mt-1" to="/signUp">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
