import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useParks from "../../hooks/useParks";
import { RotateLoader } from "react-spinners";
import "./Homepage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Homepage() {
  const { theme } = useTheme();
  const { state } = useLocation();
  const [searchValue , setSearchValue] = useState('')
  let navigate = useNavigate();
  const {
    parksList,
    filterParks,
    filterParksCity,
    filterParksList,
    sortByName,
    sortByCity,
    handleSearch,
    loading,
    error,
  } = useParks();

  useEffect(() => {
    state?.state && filterParks(state.state);
    setSearchValue('')
  }, [state]);

  const handleSelect = (e) => {
    if (e.target.value == "name") {
      sortByName();
    }
    if (e.target.value == "city") {
      sortByCity();
    }
  };
  return (
    <main id="Homepage" className={theme ? "pages-light" : "pages-dark"}>
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
      {!state && (<div>
        <input type="search" placeholder="Search Here" value={searchValue} onChange={(e) => {setSearchValue(e.target.value);handleSearch(searchValue)}}/>
        <select onChange={(e) => handleSelect(e)}>
          <option selected disabled>
            SortBy
          </option>
          <option value="name">Name</option>
          <option value="city">City</option>
        </select>
      </div>
      )}
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
              {state?.state || filterParksList.length > 0 ? (
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
                          navigate(`/Park/${park.name}`, { state: { park } })
                        }
                      >
                        <img src={park.pictures[0]} alt={park.name} />
                        <h2>{park.name}</h2>
                        <div id="location"><p>{park.location.city}</p><p>{park.location.state}</p></div>
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
                        navigate(`/Park/${park.name}`, { state: { park } })
                      }
                    >
                      <div key={index} className="park-card">
                        <img src={park.pictures[0]} alt={park.name} />
                        <h2>{park.name}</h2>
                        <div id="location"><p>{park.location.city}</p><p>{park.location.state}</p></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
