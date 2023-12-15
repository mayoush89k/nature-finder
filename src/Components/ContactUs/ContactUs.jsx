import React from 'react'
import { useTheme } from "../../context/ThemeContext";

export default function ContactUs() {
  const {theme} = useTheme()
  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="ContactUs">
    ContactUs</div>
  )
}
