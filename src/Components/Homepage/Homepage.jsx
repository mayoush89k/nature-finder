import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useParks from "../../hooks/useParks";
import { RotateLoader } from "react-spinners";
import "./Homepage.css";
import { Link, useLocation } from "react-router-dom";

export default function Homepage() {
  const { theme } = useTheme();
  const { state } = useLocation();
  const {
    parksList,
    filterParks,
    filterParksCity,
    filterParksList,
    loading,
    error,
  } = useParks("https://657621200febac18d403b5d1.mockapi.io/parks");

  useEffect(() => {
    state?.state && filterParks(state.state);
  }, [state]);

  return (
    <div id="Homepage" className={theme ? "pages-light" : "pages-dark"}>
      <h1>Parks List</h1>
      {/* {console.log(state)} */}
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
      {loading ? (
        <div id="loading">
          <RotateLoader />
        </div>
      ) : (
        <div id="parks-list">
          {console.log(parksList)}
          {filterParksList?.length == 0 && (
            <div>
              <h3>Empty List. you can add <h1>Parks</h1> and <h1>Nature Places</h1> <Link to="/addPark">here</Link> </h3>
              
            </div>
          )}
          {console.log(filterParksList)}
          {state?.state &&
            filterParksList?.map((park, index) => {
              return (
                <div key={index} className="park-card">
                  <img src={park.pictures} alt={park.name} />
                  <h2>{park.name}</h2>
                </div>
              );
            })}
          {!state?.state &&
            parksList?.map((park, index) => {
              return (
                <div key={index} className="park-card">
                  <img src={park.pictures} alt={park.name} />
                  <h2>{park.name}</h2>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
