import React, { useEffect, useState } from "react";
import national_parks from "../../nature.js";
import "./Nature.css";
import axios from "axios";

export default function Nature() {
  const [parks, setParks] = useState();
  const [input, setInput] = useState("");
  const url = "https://657621200febac18d403b5d1.mockapi.io/parks";
  useEffect(() => {
    // setParks(
    //   national_parks.sort((a, b) => {
    //     return a.id > b.id ? 1 : -1;
    //   }))
    // setParks(national_parks)
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
      setInput("")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="Nature" className="pages-light">
      <div id="parks-list">
        {console.log(parks)}

        {parks?.map((park, index) => {
          return (
            <div key={index} className="park-card">
                <button onClick={() => deletePark(park.id)}>X</button>
              <img
                src={park.pictures ? park.pictures[0] : null}
                alt={park.name}
              />
              <p>
                id: {park.id} {index}
              </p>
              <p>park.pictures</p>
              <h2>{park.name}</h2>
              <a
                href={park.location.direction}
                target="_blank"
                rel="noopener noreferrer"
              >
                direction
              </a>
              <input type="text" onChange={(e) => setInput(e.target.value)} />
              <button onClick={() => addPicture(park.id)}>add</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
