import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLocation, useParams } from "react-router-dom";
import useParks from "../../hooks/useParks";
import { BarLoader } from "react-spinners";
import "./SinglePark.css";
import { useUser } from "../../context/UserContext";

export default function SinglePark() {
  const { theme } = useTheme();
  const { name } = useParams();
  const { state } = useLocation();
  const { getPark, loading, error, updateParkData } = useParks();
  const [inputValue, setInputValue] = useState("");
  const [park, setPark] = useState(state.park);
  const {user , updateUser} = useUser() 

  useEffect(() => {
    async function fetch() {
      setPark(await getPark(state.park.id));
      console.log(park);
    }
    fetch();
  }, []);

  return (
    <main id="SinglePark" className={theme ? "pages-light" : "pages-dark"}>
      {error ? (
        <div>{error?.message}</div>
      ) : loading ? (
        <BarLoader />
      ) : (
        <div id="main-container">
          <h1>  {name}</h1>
          <h3>{park?.location.city} - {park?.location.state}</h3>
          <div id="pictures-container">
            {park?.pictures?.map((picture, index) => (
              <img src={picture} alt={`${park?.name}-${index}`} key={index} />
            ))}
          </div>
          <input
            type="text"
            placeholder="Add More Pictures Here"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log("first");
              updateParkData(park, "pictures", inputValue);
              park?.pictures
                ? setPark({ ...park, pictures: [...park.pictures, inputValue] })
                : setPark({ park, pictures: [inputValue] });
            }}
          >
            Add more Pictures
          </button>
          <h1>Activities: </h1>
          <div id="activities-container">
            {park?.activities?.map((activity, index) => (
              <div id="activity" key={index}>
                {activity}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
