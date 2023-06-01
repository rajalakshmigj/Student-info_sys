import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineArrowBack } from "react-icons/md";


const initialState = {
    firstname: "",
    lastname: "",
    Location: "",
    Email: "",
    DOB: "",
    // dd: "",
    // mm: "",
    // yyy:"",
    Education: "",
    about: "",
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { firstname, lastname, Location, Email, DOB, Education, about } = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() =>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}));

    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !Location || !Email || !DOB || !Education || !about ) {
            toast.error("Please provide value into each input field");
        }
        else {
            if(!id){
                axios.post(`http://localhost:5000/api/post` , {
                firstname,
                lastname,
                Location,
                Email,
                DOB,
                // dd,
                // mm,
                // yyyy,
                Education,
                about,
                
            }).then(() => {
                setState({ firstname: "", lastname: "", Location: "", Email: "", DOB: "",  Education: "", about: ""})
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Added Successfully!");
            }else{
                axios.put(`http://localhost:5000/api/update/${id}` , {
                firstname,
                lastname,
                Location,
                Email,
                DOB,
                // dd,
                // mm,
                // yyyy,
                Education,
                about,
                
            }).then(() => {
                setState({ firstname: "", lastname: "", Location: "", Email: "", DOB:"", Education: "", about: ""})
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Updated Successfully!");
            }
            
            setTimeout(() => navigate("/"), 500);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevalue) => {
            return {
              ...prevalue,           
              [name]: value
            }
          })
    };

    return (
        <div className='container'>      

            <div className='stud-details'>
            <div className='back-arrow'>
           
            <Link to={"/"}>
            <MdOutlineArrowBack/>
            </Link>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='name'>
                        <div className='form-info'>

                <label htmlFor='fname'>First Name : </label>
                <input
                    type='text'
                    id='fname'
                    name='firstname'
                    value={firstname || ""}
                    onChange={handleInputChange}
                />
                 </div>

                 <div className='form-info lname'>
                <label htmlFor='lname'>Last Name : </label>
                <input
                    type='text'
                    id='lname'
                    name='lastname'
                    value={lastname || ""}
                    onChange={handleInputChange}
                />
                </div>
                </div>
                <div className='form-info'>
                <label htmlFor='location'> Location : </label>
                <input
                    type='text'
                    id='loc'
                    name='Location'
                    value={Location || ""}
                    onChange={handleInputChange}
                />
                </div>
                <div className='form-info'>
                <label htmlFor='email'>Email: </label>
                <input
                    type='email'
                    id='email'
                    name='Email'
                    value={Email || ""}
                    onChange={handleInputChange}
                />
                </div>

                <div className='form-info'>

                <label htmlFor='dob'>DOB : </label>
                <div className='date-input'>
                <input 
                    type='date'
                    placeholder='dd/mm/yyyy'
                    id='DOB'
                    name='DOB'
                    value={DOB || ""}
                    onChange={handleInputChange}
                />
                {/* <input
                    type='text'
                    maxLength={2}
                    placeholder='MM'
                    id='mm'
                    name='mm'
                    value={mm || ""}
                    onChange={handleInputChange}
                />
                <input
                    type='text'
                    maxLength={4}
                    placeholder='YY'
                    id='yyyy'
                    name='yyyy'
                    value={yyyy || ""}
                    onChange={handleInputChange}
                /> */}
                </div>
                </div>
                <div className='form-info'> 
                
                <label htmlFor='education'>Education : </label>
                <input
                    type='text'
                    id='eduation'
                    name='Education'
                    value={Education || ""}
                    onChange={handleInputChange}
                />
                </div>

                <div className='form-info about' >                 
                <label htmlFor='about'>About : </label>
                <textarea 
                type='text' 
                id= 'about'
                name='about'
                value={about || ""}
                onChange={handleInputChange}
                />
                </div>
                <input type='submit' className='btn btn-submit' value={id ? "update" : "Submit"} />
                
                    {/* <input type='button' value='Go Back' /> */}
                
            </form>
            

        </div>

        </div>
    )
}


export default AddEdit




// import React, { useState, useEffect } from 'react';
// import {  useParams, Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
// import "./AddEdit.css";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const initialState = {
//     firstname : "",
//     lastname : "",
//     Location:"",
//     Email:"",
//     DOB:"",
//     Education:"",
// };

// const AddEdit = () => {

//     const [state, setState] = useState(initialState);

//     const {firstname,lastname,Location,Email,DOB,Education} = state;

//     const history = useNavigate();
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if( !firstname || !lastname || !Location || !Email || !DOB || !Education ){
//             toast.error("Please provide value into each input field");
//         }
//         else{
//             axios.post(`http://localhost:5000/api/post`, {
//                 firstname,
//                 lastname,
//                 Location,
//                 Email,
//                 DOB,
//                 Education
//             }).then(() => {
//                 setState({firstname : "", lastname: "", Location:"", Email:"", DOB:"", Education:"" })
//             }).catch((err) => toast.error(err.response.data));
//             setTimeout(() => history.push("/"), 500);
//         }
//     }
//     const handleInputChange = (e) => {
//         console.log("target", e.target.name,e.target.value);
//         const {name,value} = e.target;
//         setState({...state, [name]: value});
//     };

//     return(
//         <div>
//             <form onsubmit = {handleSubmit}>
                
//                 <label htmlFor='fname'>First Name : </label>
//                 <input 
//                 type='text' 
//                 id= 'fname'
//                 name='fname'
//                 value={firstname}
//                 onChange={handleInputChange}
//                 />
//                 <label htmlFor='lname'>Last Name : </label>
//                 <input 
//                 type='text' 
//                 id= 'lname'
//                 name='lname'
//                 value={lastname}
//                 onChange={handleInputChange}
//                 />
//                 <label htmlFor='location'> Location : </label>
//                 <input 
//                 type='text' 
//                 id= 'loc'
//                 name='loc'
//                 value={Location}
//                 onChange={handleInputChange}
//                 />
//                 <label htmlFor='email'>Email: </label>
//                 <input 
//                 type='email' 
//                 id= 'email'
//                 name='email'
//                 value={Email}
//                 onChange={handleInputChange}
//                 />
//                 <label htmlFor='dob'>DOB : </label>
//                 <input 
//                 type='date' 
//                 id= 'dob'
//                 name='dob'
//                 value={DOB}
//                 onChange={handleInputChange}
//                 />
//                 <label htmlFor='education'>Education : </label>
//                 <input 
//                 type='text' 
//                 id= 'eduation'
//                 name='education'
//                 value={Education}
//                 onChange={handleInputChange}
//                 />
//                 {/* <label htmlFor='about'>About : </label>
//                 <input 
//                 type='text' 
//                 id= 'about'
//                 name='about'
//                 value={about}
//                 onChange={handleInputChange}
//                 /> */}
//                 <input type='submit' value='Submit' />
//                 <Link to={"/"}>
//                 <input type='button' value='Go Back' />
//                 </Link>
//             </form>

//         </div>
//     )
// }


// export default AddEdit

