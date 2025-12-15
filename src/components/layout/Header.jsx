import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "./UserMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- CONTACT SCROLL ---------------- */
  const handleContactClick = () => {
    if (location.pathname === "/") {
      document.getElementById("contact-us")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/#contact-us");
    }
    setOpen(false);
  };

  /* ---------------- ACTIVE LINK ---------------- */
  const navClass = ({ isActive }) =>
    isActive
      ? "text-primary font-medium"
      : "text-secondary hover:text-primary transition";

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/AB (2).png"
            alt="AB Real Estate"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-semibold tracking-wide text-primary">
            AB REAL ESTATE
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <NavLink to="/listings" className={navClass}>
            Explore
          </NavLink>

          <button
            onClick={handleContactClick}
            className="text-secondary hover:text-primary transition"
          >
            Contact
          </button>

          {/* AUTH / USER MENU */}
          {!user ? (
            <Link
              to="/login"
              className="border border-primary px-4 py-2 rounded-md
                         text-primary font-medium
                         hover:bg-primary hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <UserMenu />
              <button
                onClick={handleLogout}
                className="text-secondary hover:text-primary transition text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor">
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-secondary/20">
          <div className="px-6 py-6 flex flex-col gap-5 text-sm">

            <NavLink to="/listings" className={navClass} onClick={() => setOpen(false)}>
              Explore
            </NavLink>

            <button
              onClick={handleContactClick}
              className="text-secondary hover:text-primary transition text-left"
            >
              Contact
            </button>

            {user && (
              <>
                <UserMenu />
                <button
                  onClick={handleLogout}
                  className="text-left text-secondary hover:text-primary transition"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="font-medium text-primary"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
