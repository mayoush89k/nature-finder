import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import "./History.css";
import { Link } from "react-router-dom";

export default function History() {
  const { user, updateUser } = useUser();
  const { theme } = useTheme();

  useEffect(() => {
    console.log(user.parksAdded);
  }, [user]);

  const handleClear = (park, index) => {
    const updatedUser = user.parksAdded.filter((currPark, i) => i != index);
    updateUser({ ...user, parksAdded: updatedUser });
  };
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="History">
      {user ? (
        <div>
          <h1>{user?.name} History</h1>
          {user?.parksAdded ? (
            <div id="history-container">
              {user?.parksAdded.map((park, index) => (
                <div className="history-card" key={index}>
                  <button onClick={() => handleClear(park, index)} id="clear">
                    X
                  </button>
                  {park?.name}
                  {park.pictures ? (
                    park?.pictures.map((picture, index) => (
                      <img src={picture} key={index} />
                    ))
                  ) : (
                    <div>empty Pictures</div>
                  )}
                  <p>{park.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <h3>Empty History</h3>
          )}
        </div>
      ) : (
        <div>
          <h1>
            <Link to="/Login">Login</Link> /{" "}
            <Link to="/Register">Register</Link>{" "}
          </h1>
        </div>
      )}
    </div>
  );
}
