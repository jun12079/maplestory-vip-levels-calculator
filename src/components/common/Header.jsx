import { NavLink } from "react-router-dom";

const routes = [
  { path: "/maintain-calculator", name: "維持階級" },
  { path: "/multi-calculator", name: "多段階級" },
  { path: "/platinum-hammer", name: "寵箱換鎚" },
];

export default function Header() {

  return (
    <>
      <nav className="navbar navbar-expand-lg mb-4">
        <div className="container">
          <h1 className="fs-6 mb-0">
            <NavLink
              to="/"
              className="navbar-brand fw-bold"
            >
              VIP計算機
            </NavLink>
          </h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {routes.map((route) =>
                route.path === "/multi-calculator" ? (
                  <li key={route.path} className="nav-item">
                    <span className="nav-link disabled">{route.name}</span>
                  </li>
                ) : (
                  <li key={route.path} className="nav-item">
                    <NavLink to={route.path} className="nav-link">
                      {route.name}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
