import axios from "axios";
import { useEffect, useState } from "react";

const useParks = (url) => {
  const [parksList, setParksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParksList, setFilterParksList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setParksList(response.data);
        console.log(parksList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const filterParks = (state) => {
    setFilterParksList(
      parksList?.filter((park) =>
        park?.location.state
          .toLowerCase()
          .includes(state[0].state?.toLowerCase())||
        park?.location.city
          .toLowerCase()
          .includes(state[0].state?.toLowerCase())
      )
    );
    return filterParksList;
  };
  const filterParksCity = (city) => {
    setFilterParksList(parksList?.filter((park) => park.location.city == city));
    return filterParksList;
  };

  return {
    parksList,
    filterParksList,
    filterParks,
    filterParksCity,
    loading,
    error,
  };
};

export default useParks;
