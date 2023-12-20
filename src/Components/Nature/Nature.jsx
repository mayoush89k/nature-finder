import React, { useEffect, useState } from "react";
import national_parks from "../../nature.js";
import "./Nature.css";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function Nature() {
  const [parks, setParks] = useState();
  const [input, setInput] = useState("");
  const {theme} = useTheme()

  const url = "https://657621200febac18d403b5d1.mockapi.io/parks";
  useEffect(() => {
    fetchData();
  }, []);

  const deletePark = async (index) => {
    try {
      const response = await axios.delete(url + "/" + index);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setParks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPicture = async (index) => {
    console.log(url + "/" + index);
    try {
      const response = await axios.put(url + "/" + index, {
        pictures: [input],
      });
      console.log(response.data);
      fetchData();
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatus = async (park) => {
    if (!park.status || park.status == "pending") {
      try {
        const response = await axios.put(url + "/" + park.id, {
          status: "approved",
        });
        fetchData()
        console.log(park.status);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <main id="Nature" className={theme ? "pages-light" : "pages-dark"}>
      <div id="parks-list">
        {parks?.map(
          (park, index) =>
            park.status !== "approved" && (
              <div key={index} className="park-card">
                <button onClick={() => deletePark(park.id)}>X</button>
                <img
                  src={park.pictures ? park.pictures[0] : null}
                  alt={park.name}
                />
                <p>
                  id: {park.id}
                </p>
                <p>park.pictures</p>
                <h2>{park.name}</h2>
                <button
                  onClick={() => {
                    handleStatus(park);
                  }}
                >
                  {park.status ? park.status : "pending"}
                </button>
                <a
                  href={park?.location?.direction ? park.location.direction : null}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  direction
                </a>
                <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="add picture link"/>
                <button onClick={() => addPicture(park.id)}>add</button>
              </div>
            )
        )}
      </div>
    </main>
  );
}
