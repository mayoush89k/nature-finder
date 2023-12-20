import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import './AboutUs.css'

export default function AboutUs() {
  const { theme } = useTheme();
  let navigate = useNavigate();
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="AboutUs">
      <p>
        Who Doesn't like sitting under trees, or walking in around Nature. or
        even the most wanted thing is to sit in front of the sea or lake. and
        watch how beautiful it is. <br /><br />
        Our target is giving you the opportunity to{" "}
        <span id="span" onClick={() => navigate("/AddPark")}>add new Places</span> and
        share it with friends and other users. all what you do is register{" "}
        <span id="span" onClick={() => navigate("/Register")}>here</span>
        <br /><br />
        You can search the place by your city. or you can Pick a random place,{" "}
        <span id="span" onClick={() => navigate("/CrazyPick")}>here</span>
      </p>
    </div>
  );
}
