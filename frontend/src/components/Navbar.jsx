import React from "react";
import "./Navbar.css";
import Logo from "../../public/Cineflix.svg";
import DefaultAvatar from "../../public/DefaultAvatar.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <header className="navigation">
        <img
          src={Logo}
          alt="Cineflix Logo"
          className="logo"
          onClick={() => navigate("/")}
        />

        {user === null ? (
          <button onClick={() => navigate("/login")}>Login</button>
        ) : (
          <img
            src={
              user && user.profile
                ? user.profile
                : DefaultAvatar
            }
            alt="User Avatar"
            className="avatar"
            onClick={() => navigate("/profile")}
          />
        )}
      </header>
    </>
  );
};

export default Navbar;
