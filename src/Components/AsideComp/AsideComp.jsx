import React from "react";
import "./AsideComp.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const AsideComp = () => {
  const {theme} = useTheme()
  const [startAnimate, setStartAnimate] = React.useState(false);
  const [highlightTopPosition, setStateHighlightTopPosition] =
    React.useState(0);
  const [currCount, setCurrCount] = React.useState(0);

  const cities = [
    {
        name: 'Jerusalem',
        path: '/Jerusalem'
    },
    {
        name: 'Tel-Aviv',
        path: '/TelAviv'
    }
  ]

  const onClickTab = (count) => {
    setStartAnimate(false);
    setCurrCount(count);
    setStateHighlightTopPosition(count * 52);

    setTimeout(() => {
      setStartAnimate(true);
    }, 100);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setStartAnimate(true);
    }, 500);

    return () => {};
  }, []);

  return (
    <div className={theme ? "sidebar-light" : "sidebar-dark"} id="AsideComp">
      <div className="sidebar">
        <div
          style={{ top: `${highlightTopPosition}px` }}
          className={`sidebar__highlight ${
            startAnimate && "sidebar__highlight__animate"
          }`}
        ></div>
        {cities.map((item, index) => (
          <Link
            key={index}
            className={currCount === index && "active"}
            to={item.path}
            onClick={() => onClickTab(index)}
          >
            <span className={currCount === index && "text-active"}>
              <i className="fas fa-arrow-right"></i>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AsideComp;
