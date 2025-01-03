import React from 'react'
import { useThemeContext } from '../../hooks/useThemeContext'

export default function Themeswitch() {
    const {theme,dispatch}=useThemeContext();
    const switchTheme = () => {
        if(theme === 'light') {
            dispatch({type:'DARK'})
        }
        else {
            dispatch({type:'LIGHT'})
        }
        
        console.log(theme);
    }
  return (
    <div className='container'>
        <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={switchTheme}/>
  </div>

    </div>
  )
}
