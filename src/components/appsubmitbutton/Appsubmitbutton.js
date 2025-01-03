import React from 'react'
import './Appsubmitbutton.css';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function Appsubmitbutton({onClick,title}) {
    const {theme} = useThemeContext();
  return (
    <button type='submit' onClick={onClick} className={`btn ${theme}btn`}>{title}</button>
  )
}
