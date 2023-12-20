import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import './Error.css'

export default function Error() {
    const {theme} = useTheme()
  return (
    <div className={theme ? 'pages-light' : "pages-dark"} id='Error'>
        <div id='error-container'>
        <h1>404</h1>
        <h3>PAGE NOT FOUND</h3>

        </div>
    </div>
  )
}
