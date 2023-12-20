import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./AddPark.css";
import { useUser } from "../../context/UserContext";
import useUsersList from "../../hooks/useUsersList";
import { BarLoader } from "react-spinners";
import useParks from "../../hooks/useParks";
import { useNavigate } from "react-router-dom";

const AddPark = () => {
  const { theme } = useTheme();
  const [newPark, setNewPark] = useState({});
  const { user, updateUser } = useUser();
  let navigate = useNavigate();
  const {
    parksList,
    loading: loadingPark,
    error: errorPark,
    addNewPark,
  } = useParks();
  const {
    usersList,
    loading: loadingUser,
    error: errorUser,
    updateUserInUsersList,
  } = useUsersList();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    activity: "",
    activities: [],
    description: "",
    picture: "",
    pictures: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.type);
    if (e.type == "click") {
      setNewPark({
        name: formData.name,
        pictures: formData.pictures,
        description: formData.description,
        location: { city: formData.city, state: formData.state },
        activities: formData.activities,
        addedBy: user.username,
        createdAt: new Date().getDate(),
        status: "pending",
      });
      user.parksAdded
        ? updateUser({
            ...user,
            parksAdded: [
              ...user.parksAdded,
              {
                name: formData.name,
                pictures: formData.pictures,
                description: formData.description,
                location: { city: formData.city, state: formData.state },
                activities: formData.activities,
                addedBy: user.username,
                createdAt: new Date().getDate(),
                status: "pending",
              },
            ],
          })
        : updateUser({
            ...user,
            parksAdded: [
              {
                name: formData.name,
                pictures: formData.pictures,
                description: formData.description,
                location: { city: formData.city, state: formData.state },
                activities: formData.activities,
                addedBy: user.username,
                createdAt: new Date().getDate(),
                status: "pending",
              },
            ],
          });
      console.log(user);
      updateUserInUsersList(user, {
        name: formData.name,
        pictures: formData.pictures,
        description: formData.description,
        location: { city: formData.city, state: formData.state },
        activities: formData.activities,
        addedBy: user.username,
        createdAt: new Date().getDate(),
        status: "pending",
      });
      addNewPark({
        name: formData.name,
        pictures: formData.pictures,
        description: formData.description,
        location: { city: formData.city, state: formData.state },
        activities: formData.activities,
        addedBy: user.username,
        createdAt: new Date().getDate(),
        status: "pending",
      });
      navigate("/History");
    }

    errorPark || errorUser
      ? console.log("Form validation failed.")
      : console.log("Form data submitted:", formData);
  };

  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="AddPark">
      <h2>Add New Nature Place</h2>
      <div>
        {errorPark || errorUser ? (
          <div>
            {error.message}
            {console.log("errorPark: ", errorPark)}
          </div>
        ) : (
          <div>
            {loadingPark || loadingUser ? (
              <div>
                {console.log("loadingPark: ", loadingPark)}
                <BarLoader />{" "}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label>
                  Place Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="..."
                    className="full-width"
                  />
                </label>
                <br />
                <label id="location">Location: </label>
                <label>
                  City:
                  <input
                    placeholder="..."
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  State:
                  <input
                    placeholder="..."
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  Description:
                  <input
                    placeholder="..."
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  activities:
                  <input
                    placeholder="..."
                    type="text"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                  />
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        activities: [
                          ...formData["activities"],
                          formData.activity,
                        ],
                      });
                    }}
                  >
                    add activity
                  </button>
                </label>
                <br />
                <label>
                  Pictures:
                  <input
                    placeholder="... "
                    type="text"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                  />
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        pictures: [...formData["pictures"], formData.picture],
                      });
                    }}
                  >
                    add Picture
                  </button>
                </label>
                <br />

                <button type="submit" onClick={handleSubmit}>
                  Add Place
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPark;
