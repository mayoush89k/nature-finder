import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useUsersList from "../../hooks/useUsersList";
import { RotateLoader } from "react-spinners";

export default function Register() {
  const [formList, setFormList] = useState([
    {
      name: "name",
      value: "",
      error: "",
      type: "text",
      placeholder: "Name",
    },
    {
      name: "username",
      value: "",
      error: "",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "email",
      value: "",
      error: "",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      value: "",
      error: "",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "confirmed",
      value: "",
      error: "",
      type: "password",
      placeholder: "Confirm Password",
    },{
      name: "city",
      value: "",
      error:"",
      type: "text",
      placeholder: "City"
    }
  ]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: ""
  });
  const [isValid, setIsValid] = useState(true);
  const { user, setUser } = useUser();
  const { usersList, loading, error } = useUsersList(
    "https://6571e97ed61ba6fcc013f0b6.mockapi.io/users"
  );
  const { theme } = useTheme();
  let navigate = useNavigate();

  const validateForm = () => {
    setIsValid(true);

    // Check for empty fields
    formList.map((input) => {
      const {value , name} = input
      setFormData(prev => [{...prev, [name]:value }])
      if (!input.value) {
        input.error = `${
          input.name.charAt(0).toUpperCase() + input.name.slice(1)
        } is required.`;
        setIsValid(false);
      }

      if (
        (input.name == "name" && input.value.length < 3) ||
        (input.name == "username" && input.value.length < 3)
      ) {
        input.error = "Must be at least 3 characters long";
        setIsValid(false);
      }
      //check Email
      const emailRegEx =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // check password validation
      const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );

      if (input.name == "email" && !emailRegEx.test(input.value)) {
        input.error == "Email is not Valid";
        setIsValid(false);
      }
      if (input.name == "password" && !passwordRegex.test(input.value)) {
        input.error ==
          "Password must be 8 Upper/LowerCase Characters, Numbers and Symbols!!";
        setIsValid(false);
      }

      if (input.name == "confirmed" && input.value !== formList[3].value) {
        input.error = "Passwords don't match";
        setIsValid(false);
      }
      });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (validateForm()) {
      setUser(formData);
      // Perform registration logic using formData
      console.log("Form data submitted:", formData);
      // You can add your registration logic here (e.g., API call)
    } else {
      console.log("Form validation failed.");
    }
  };
  const handleChange = (e) => {
    // no need to save also confirmed password to my user's data
    e.target.name != "confirmed" &&
    //save the form values to user's data
      setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormList(
      formList.map((input) =>
        input.name == e.target.name
          ? {
              ...input,
              value: e.target.value,
              // Clear error when user starts typing
              error: "",
            }
          : input
      )
    );
  };
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="Register">
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        {/* create the inputs as useState list of objects, so we can re-render on page by each value of input  */}
        {formList.map((input, index) => (
          <div key={index}>
            <input
              key={input.name}
              type={input.type}
              name={input.name}
              value={input.value}
              placeholder={input.placeholder}
              onChange={handleChange}
            />{" "}
            <br />
            <span id="error">{input.error}</span>
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
      {/* spinner timeout for Registration time */}
      {user?.username && (
        <div className="spinner">
          Welcome {user.Name} to Nature Finder
          <div id="spinner-loader">
            <RotateLoader />{" "}
          </div>
          {setTimeout(() => {
            navigate(`/`, { state: { user: user } });
          }, 2000)}
        </div>
      )}
    </div>
  );
}
