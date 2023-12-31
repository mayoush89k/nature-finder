import React, { useEffect, useRef, useState } from "react";
import {
  FaRegUserCircle,
  FaSortDown,
  FaBars,
  FaRegLightbulb,
} from "react-icons/fa";
import "./Header.css";
import { useTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const { theme, changeTheme } = useTheme();
  const { user, getUser, logOutUser } = useUser();
  const [clicked, setClicked] = useState(false);
  let navigate = useNavigate()

  const menuList = [
    { name: "Homepage", path: "/" },
    { name: "Add More", path: "/AddPark" },
    { name: "About Us", path: "/AboutUs" },
    { name: "Contact Us", path: "/ContactUs" },
  ];
  return (
    <nav className="Header" id={theme ? "light-header" : "dark-header"}>
      {/* menu list */}
      <menu id="menu">
        {menuList.map((item, index) => (
          <Link key={index} className="menu-item" to={item.path}>
            <ul>
              <li>{item.name}</li>
            </ul>
          </Link>
        ))}
      </menu>
      <Link className='Crazy' to="/CrazyPick">
        Crazy Pick
      </Link>
      {/* setting side */}
      <section name="setting" id="setting">
        <div onClick={() => setClicked((prev) => !prev)}>
          <FaBars />
        </div>
        <button id="mode" onClick={changeTheme}>
          <FaRegLightbulb />
        </button>
      </section>
      {/* login / logout container */}
      {clicked && (
        <div id="setting-container">
          {console.log(user)}
          {!user ? (
            <div>
              <button
                onClick={() =>
                  setTimeout(() => {
                    setClicked(false);
                  }, 500)
                }
              >
                <Link to="/Login" className="link">
                  Login
                </Link>
              </button>{" "}
              <button
                onClick={() =>
                  setTimeout(() => {
                    setClicked(false);
                  }, 500)
                }
              >
                <Link to="/Register" className="link">
                  Register
                </Link>
              </button>
            </div>
          ) : (<div>
            {user?.name == 'admin' && <button onClick={() =>
                setTimeout(() => {
                  setClicked(false);
                  navigate('/Nature')
                }, 500)
              }>
              Admin
            </button>
            }<button onClick={() =>
                setTimeout(() => {
                  setClicked(false);
                  navigate('/History')
                }, 500)
              }>
              History
            </button>
            <button
              onClick={() =>
                setTimeout(() => {
                  setClicked(false);
                  logOutUser();
                }, 500)
              }
            >
              Logout
            </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
