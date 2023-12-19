import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLocation, useParams } from "react-router-dom";
import useParks from "../../hooks/useParks";
import { BarLoader } from "react-spinners";
import "./SinglePark.css";

export default function SinglePark() {
  const { theme } = useTheme();
  const { name } = useParams();
  const { state } = useLocation();
  const { getPark, loading, error, updateParkData } = useParks();
  const [inputValue, setInputValue] = useState("");
  const [park, setPark] = useState(state.park);

  useEffect(() => {
    async function fetch() {
      setPark(await getPark(state.park.id));
      console.log(park);
    }
    fetch();
  }, []);

  return (
    <div id="SinglePark" className={theme ? "pages-light" : "pages-dark"}>
      SinglePark
      {error ? (
        <div>{error?.message}</div>
      ) : loading ? (
        <BarLoader />
      ) : (
        <div id="main-container">
          <h1>{name}</h1>
          <div id="pictures-container">
            {park?.pictures?.map((picture, index) => (
              <img src={picture} alt={`${park?.name}-${index}`} key={index} />
            ))}
            {/* {console.log(park?.pictures[0])} */}
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
    </div>
  );
}
