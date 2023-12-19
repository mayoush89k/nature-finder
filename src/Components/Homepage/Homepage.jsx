import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import useParks from "../../hooks/useParks";
import { RotateLoader } from "react-spinners";
import "./Homepage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Homepage() {
  const { theme } = useTheme();
  const { state } = useLocation();
  let navigate = useNavigate();
  const {
    parksList,
    filterParks,
    filterParksCity,
    filterParksList,
    loading,
    error,
  } = useParks();

  useEffect(() => {
    console.log(state)
    state?.state && filterParks(state.state);
  }, [state]);

  return (
    <div id="Homepage" className={theme ? "pages-light" : "pages-dark"}>
            <h1>Parks List</h1>
      <div id="cities-list">
        {state?.state?.map((dist, index) => (
          <button
            key={index}
            onClick={() => filterParksCity(dist["city-name"])}
          >
            {dist["city-name"]}
          </button>
        ))}
      </div>
      {error ? (
        <h1>{error.message}</h1>
      ) : (
        <div>
          {loading ? (
            <div id="loading">
              <RotateLoader />
            </div>
          ) : (
            <div id="parks-list">
              {/* when clicking on the list of aside component */}
              {/* if clicked ? */}
              {state?.state ? (
                filterParksList?.length == 0 ? ( //empty list of parks
                  <div>
                    <h3>
                      Empty List. you can add <h1>Parks</h1> and{" "}
                      <h1>Nature Places</h1> <Link to="/AddPark">here</Link>{" "}
                    </h3>
                  </div>
                ) : (
                  filterParksList?.map((park, index) => {
                    // not empty. show the list of parks filtered by clicked state or city
                    return (
                      <div
                        key={index}
                        className="park-card"
                        onClick={() =>
                          navigate(`${park.name}`, { state: { park } })
                        }
                      >
                        <img src={park.pictures[0]} alt={park.name} />
                        <h2>{park.name}</h2>
                      </div>
                    );
                  })
                )
              ) : (
                parksList?.map((park, index) => {
                  // if not clicking on aside list, show all the list
                  return (
                    <div
                      onClick={() =>
                        navigate(`${park.name}`, { state: { park } })
                      }
                    >
                      <div key={index} className="park-card">
                        <img src={park.pictures[0]} alt={park.name} />
                        <h2>{park.name}</h2>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
