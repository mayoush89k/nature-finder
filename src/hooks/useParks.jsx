import axios from "axios";
import { useEffect, useState } from "react";

const useParks = () => {
  const [parksList, setParksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParksList, setFilterParksList] = useState([]);
  const url = "https://657621200febac18d403b5d1.mockapi.io/parks";
  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setParksList(response.data.filter((park) => park.status == "approved"));
      // setParksList(response.data)
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const getPark = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(url + "/" + id);
      console.log(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const filterParks = (state) => {
    setFilterParksList(
      parksList?.filter(
        (park) =>
          park.location.state
            .toLowerCase()
            .includes(state[0].state?.toLowerCase()) ||
          park.location.city
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
      console.log(newPark);
      const response = await axios.post(url, newPark);
      console.log("post new park ", response.data);
      fetchData();
    } catch (error) {
      setError(error);
    }
  };
  const sortByName = () => {
    setFilterParksList(parksList.sort((a, b) => (a.name > b.name ? 1 : -1)));
  };
  const sortByCity = () => {
    setFilterParksList(
      parksList.sort((a, b) => (a.location.city > b.location.city ? 1 : -1))
    );
  };
  const handleSearch = (input) => {
    setFilterParksList(
      parksList.filter((park) => park.name.toLowerCase().includes(input))
    );
  };
  const updateParkData = async (park, changedKey, changedValue) => {
    const newData = park[changedKey]
      ? {
          [changedKey]: [...park[changedKey], changedValue],
        }
      : {
          [changedKey]: [changedValue],
        };
    try {
      setLoading(true);
      const response = await axios.put(`${url}/${park.id}`, newData);
      console.log("updated ", response.data);
      fetchData();
      console.log(park);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const getRandomPark = async () => {
    setLoading(true);
    const random = Math.floor(Math.random() * parksList.length) + 1;
    console.log(random);
    try {
      const response = await axios.get(url + "?id=" + random);
      console.log(response.data[0]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return await response.data[0];
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  return {
    parksList,
    filterParksList,
    filterParks,
    filterParksCity,
    addNewPark,
    updateParkData,
    sortByName,
    sortByCity,
    handleSearch,
    getPark,
    getRandomPark,
    loading,
    error,
  };
};

export default useParks;
