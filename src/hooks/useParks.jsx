import axios from "axios";
import { useEffect, useState } from "react";

const useParks = () => {
  const [parksList, setParksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParksList, setFilterParksList] = useState([]);
  const url = "https://657621200febac18d403b5d1.mockapi.io/parks"
  useEffect(() => {
    fetchData();
  }, [url]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setParksList(response.data.filter(park => park.status == 'approved'));
      // setParksList(response.data)
      console.log(parksList)
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
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
  const addNewPark = async (newPark) => {
    try {
      const response = await axios.post(url,newPark)
      console.log("post new park ", response.data)
      fetchData()
    } catch (error) {
      setError(error)
    }
  }

  return {
    parksList,
    filterParksList,
    filterParks,
    filterParksCity,
    addNewPark,
    loading,
    error,
  };
};

export default useParks;
