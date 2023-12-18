import { useEffect, useState } from "react";
import cities from "../assets/cities";

const useCities = () => {
  const [citiesList, setCitiesList] = useState(cities);
  const [stateList, setStateList] = useState([]);

  const getCitiesListByState = (state) =>
    citiesList.filter((city) => city.state == state);
  useEffect(() => {
    const getStates = [];
    citiesList.map((city) => {
      if (!getStates.find((state) => state == city.state)) {
        getStates.push(city.state);
      }
    });
    setStateList(getStates);
  }, []);

  return { citiesList, stateList, getCitiesListByState };
};
export default useCities;
