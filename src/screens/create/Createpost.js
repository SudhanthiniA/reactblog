import React, { useEffect, useState } from 'react'
import './Createpost.css'
import { Usefetch } from '../../hooks/Usefetch';
import { useNavigate } from 'react-router-dom';
import Appsubmitbutton from '../../components/appsubmitbutton/Appsubmitbutton';
export default function Createpost() {
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

  const navigate=useNavigate();
 const { data, error, optionData } = Usefetch("https://jsonplaceholder.typicode.com/posts/", "POST");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value, userId:1 })
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
    // const {title, body} = validationError;
   if(isValid) {

    optionData(formField);  // Pass the form data to the Usefetch hook
    console.log("Form Submitted Successfully", formField);
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
    if(data.length !==0) {
      const timer = setTimeout(()=> navigate("/"),3000);
      return ()=> clearTimeout(timer)
    }

  },[data,navigate])
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
            Post created Successfully
          </div>
           
          }
          {
            error && <div class="alert alert-danger" role="alert">
           {error}
          </div>
          
          }
        <div className='text-end'>
          <Appsubmitbutton title="create"></Appsubmitbutton>
          <button type='button' className='btn bg-danger text-white'>Cancel</button>
        </div>
      </form>

      
    </div>
  );
}
