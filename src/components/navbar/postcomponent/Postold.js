import React from 'react'
import './Post.css'
import { useNavigate } from 'react-router-dom'
import './Post.css';
import { useThemeContext } from "../../../hooks/useThemeContext";
export default function Post({post}) {

  const navigate=useNavigate()

  const handleClick = () => {
    navigate(`/post/${post.id}`,{state:post})
    // console.log("Card")
  }
  
  const {theme} = useThemeContext();
  return (
    <div className="card" onClick={handleClick}>
    <div className={`${theme}cardbg card-header`}>
      {post.title}
    </div>
    <div className={`${theme}cardbodybg card-body`}>
     
      <p className="card-text">{post.body}</p>
     
    </div>
  </div>
  )
}
