import React from 'react'
import { useTheme } from "../../context/ThemeContext";

export default function AboutUs() {

  const {theme} = useTheme()
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="AboutUs">
      AboutUs</div>
  )
}
