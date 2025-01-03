  import React, {useEffect} from 'react'
  import './Postdetail.css' 
  import { useLocation, useNavigate } from 'react-router-dom'
  import { Usefetch } from '../../hooks/Usefetch';
  import './Postdetail.css'
import { useThemeContext } from '../../hooks/useThemeContext';
import Appsubmitbutton from '../../components/appsubmitbutton/Appsubmitbutton';

  export default function Postdetails() {
    const location =useLocation();
    const {state:post}=location;
    // console.log(state)
    const navigate = useNavigate();
    const handleEdit = () => {
     navigate(`/edit/${post.id}`,{state:post});
    };
    //Delete Function
    const { data, error, optionData } = Usefetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, 'DELETE');
    const handleDelete = () => {
      optionData();
     };
     useEffect(() => {
      if(data.length !==0) {
        const timer = setTimeout(()=> navigate("/"),3000);
        return ()=> clearTimeout(timer)
      }
  
    },[data,navigate])
    const {theme} = useThemeContext();
    return (
      <div className='container'>
      <div className="card border-secondary">
      <div className={`${theme}cardbg card-header`}>
      {post.id}   {post.title}
      </div>
      <div className="card-body bg-white">
      
        <p className="card-text">{post.body}</p>
      
      </div>
      <div className="card-footer bg-white text-end ">
      <Appsubmitbutton title="Edit" onClick={handleEdit}></Appsubmitbutton>
      <Appsubmitbutton title="Delete" onClick={handleDelete}></Appsubmitbutton>
      {/* <button type='submit' className='btn bg-primary text-white me-2' onClick={handleEdit}>Edit</button>
      <button type='submit' className='btn bg-danger text-white' onClick={handleDelete}>Delete</button> */}
      
      </div>
      {
            data.length !== 0 && <div className="alert alert-success" role="alert">
            Post Deleted Successfully
          </div>
           
          }
          {
            error && <div class="alert alert-danger" role="alert">
           {error}
          </div>
          
          }
    </div>
    </div>
    )
  }
