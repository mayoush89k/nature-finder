import React from 'react'
import { useTheme } from "../../context/ThemeContext";

export default function Homepage() {
  const {theme} = useTheme()
  return (
    <div id="Homepage">
    Homepage</div>
  )
}
