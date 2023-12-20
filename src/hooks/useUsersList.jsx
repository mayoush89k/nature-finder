import axios from "axios";
import { useEffect, useState } from "react";

const useUsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://657621200febac18d403b5d1.mockapi.io/user";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setUsersList(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const createUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(url, userData);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const updateUserInUsersList = async (user, newPark) => {
    const response = await axios.put(url + "/" + user.id, {
      parksAdded: [...user.parksAdded, newPark],
    });
    console.log("Added ", newPark);
  };
  return { usersList, loading, error, updateUserInUsersList, createUser };
};

export default useUsersList;
