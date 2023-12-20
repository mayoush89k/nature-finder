import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { PacmanLoader } from "react-spinners";
import useParks from "../../hooks/useParks";
import "./CrazyPick.css";

export default function CrazyPick() {
  const { theme } = useTheme();
  const { getRandomPark, loading, error } = useParks();
  const [crazyPark, setCrazyPark] = useState({});
  useEffect(() => {
    async function fetch() {
      setCrazyPark(await getRandomPark());
      console.log(crazyPark);
    }
    fetch();
  }, []);
  return (
    <main className={theme ? "pages-light" : "pages-dark"} id="CrazyPick">
      {error ? (
        <div>error.message</div>
      ) : loading ? (
        <PacmanLoader />
      ) : (
        <div>
          <button
            className="Crazy"
            onClick={async () => setCrazyPark(await getRandomPark())}
          >
            Pick Another
          </button>
          {crazyPark != undefined ? (
            <div>
              <h1>{crazyPark?.name}</h1>
              <h3>
                {crazyPark?.location?.city} - {crazyPark?.location?.state}
              </h3>
              <img src={crazyPark?.pictures[0]} alt={crazyPark?.name} />
              <p>{crazyPark.description}</p>
              {crazyPark?.activities.map((activity, index) => (
                <div className="activity" key={index}>
                  {activity}
                </div>
              ))}
            </div>
          ) : (
            <div id="error-container">
              <h1>404</h1>
              <h3>PAGE NOT FOUND</h3>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
