import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Usefetch } from '../../hooks/Usefetch';
import Appsubmitbutton from '../../components/appsubmitbutton/Appsubmitbutton';


export default function Editpost() {

  const [formField, setFormField] = useState(
    {
      title: '',
      body: '',
      userId:''
    }
  );
  const [validationError, setvalidationError]=useState(
    {
       title: '',
      body: ''
    }
  )

  const [modifiedField, setModifiedField] = useState({});

  const navigate=useNavigate();
    const location=useLocation();
    const {state:post} = location;
    // console.log(post);

    const { data, error, optionData } = Usefetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, 'PATCH');

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormField({ ...formField, [name]: value, userId:1 })
      setModifiedField({...modifiedField, [name]: value});
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      let errors = {};
      let isValid=true;
        if(!formField.title ) {
          errors.title="Title should not be empty";
          console.log(errors.title);
          isValid=false;
        }
        if(!formField.body ) {
          errors.body="Body should not be empty";
          console.log(errors.body);
          isValid=false;
        }
       setvalidationError(errors);
       console.log("Modified", modifiedField);
      // const {title, body} = validationError;
     if(isValid) {
  
      console.log("Form Submitted Successfully", modifiedField);
      optionData(modifiedField);  // Pass the form data to the Usefetch hook
      
      // console.log("Modified is vlida", modifiedField);
     }
     else {
      
      console.log("Validation is not done",errors);
     }
      
      // return validationError;
      // setvalidationError(
      //   {
      //     title: '',
      //    body: ''
      //  }
      // )
      
      // console.log("handleClick", formField);
    };
    useEffect(() => {
      setFormField(post);
      // setFormField(post.body);
      if(data.length !==0) {
        const timer = setTimeout(()=> navigate("/"),3000);
        return ()=> clearTimeout(timer)
      }
  
    },[data,navigate, post])
  return (
    <div className='container'>
    <form onSubmit={handleClick}>
      <div className="my-3">
        <label className="form-label">Title</label>
        <input name='title' type="text" className="form-control" placeholder="Enter Title" value={formField.title} onChange={handleChange}></input>
   { validationError.title && <h3>{validationError.title}</h3>}
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea name='body' className="form-control" rows="3" value={formField.body} onChange={handleChange}></textarea>
        { validationError.body && <h3>The body field should not be empty</h3>}
        </div>
        {
          data.length !== 0 && <div className="alert alert-success" role="alert">
          Post Edited Successfully
        </div>
         
        }
     
        {
          error && <div class="alert alert-danger" role="alert">
         {error}
        </div>
        
        } 
      <div className='text-end'>
      <Appsubmitbutton title="Update"></Appsubmitbutton>
        {/* <button type='submit' className='btn bg-primary text-white me-2'>Update</button> */}
        <button type='button' className='btn bg-danger text-white'>Cancel</button>
      </div>
    </form>

    
  </div>
  );  
}
