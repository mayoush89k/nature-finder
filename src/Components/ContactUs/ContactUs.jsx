import { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ContactUs.css";
import { BarLoader, RotateLoader } from "react-spinners";

export default function ContactUs() {
  const { theme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef({
    name: formData.name,
    email: formData.email,
    message: formData.message,
  });

  function submitFormHandler(e) {
    e.preventDefault();
    setFormDetails(formRef.current);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormDetails({
        name: "",
        email: "",
        message: "",
      });
    }, 3000)
  }

  function inputHandler(e) {
    const { name, value } = e.target;
    formRef.current = { ...formRef.current, [name]: value };
  }
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="ContactUs">
      <form onSubmit={submitFormHandler} id="main-contactUs">
        <h1>Contact Me</h1>
        <Name inputHandler={inputHandler} formRef={formRef} />
        <Email inputHandler={inputHandler} formRef={formRef} />
        <Message inputHandler={inputHandler} formRef={formRef} />
        <Submit />

        {submitted && (
        <div className="spinner">
          Thank you for contacting us. we will answer you as soon as we can
          <div id="spinner-loader">
            <RotateLoader />
          </div>
          {setTimeout(() => {
            setSubmitted(false);
          }, 2500)}
        </div>
      )}
      </form>
    </div>
  );
}

function Name({ inputHandler, formRef }) {
  return (
    <input
      type="text"
      name="name"
      ref={formRef}
      placeholder="Enter your Name"
      value={formRef.name}
      onChange={inputHandler}
    />
  );
}
function Email({ inputHandler, formRef }) {
  return (
    <input
      type="email"
      name="email"
      ref={formRef}
      placeholder="Enter Your Email"
      value={formRef.email}
      onChange={inputHandler}
    />
  );
}
function Message({ inputHandler, formRef }) {
  return (
    <textarea
      name="message"
      placeholder="Enter your message"
      ref={formRef}
      value={formRef.message}
      onChange={inputHandler}
    ></textarea>
  );
}
function Submit() {
  return <input type="submit" value="Send" id="submit" />;
}
