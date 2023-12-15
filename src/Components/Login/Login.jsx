import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import "./Login.css";
// import Spinner from "../Spinner/Spinner";
import { useUser } from "../../context/UserContext";
import { RotateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const form = [
    {
      type: "text",
      placeholder: "Username ",
      value: "",
      error: false,
    },
    {
      type: "password",
      placeholder: "Password ",
      value: "",
      error: false,
    },
  ];
  const { user, setUser } = useUser();
  const { theme } = useTheme();
  const [inputValues, setInputValues] = useState(form);
  const [usersList, setUsersList] = useState([]);
  const usersUrl = "https://6571e97ed61ba6fcc013f0b6.mockapi.io/users";
  let navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await axios.get(usersUrl);
      setUsersList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    const userMatch = usersList.find((user) => {
      return (
        user.username === inputValues[0].value &&
        user.password === inputValues[1].value
      );
    });
    if (userMatch) {
      // save the user in local storage and also in state to use it afterwords
      setUser(userMatch);
    } else {
      user.username === inputValues[0].value
        ? setInputValues([inputValues[0], { ...inputValues[1], error: true }])
        : setInputValues([{ ...inputValues[0], error: true }, inputValues[1]]);
    }
  };

  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="LoginPage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* create the inputs as useState list of objects, so we can re-render on page by each value of input  */}
        {inputValues.map((value, index) => (
          <div key={index}>
            <input
              type={value.type}
              placeholder={value.placeholder}
              value={value.value}
              onChange={(e) =>
                setInputValues(
                  inputValues.map((value, i) =>
                    i == index
                      ? { ...value, value: e.target.value, error: false }
                      : value
                  )
                )
              }
            />
            {value.error && <p id="error">Wrong {value.placeholder}</p>}
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
      {/* spinner timeout for login time */}
      {user?.username && (
        <div className="spinner">
          login successful
          <div id="spinner-loader">
            <RotateLoader />{" "}
          </div>
          {setTimeout(() => {
            navigate(`/`, { state: { user } });
          }, 2000)}
        </div>
      )}
    </div>
  );
}
