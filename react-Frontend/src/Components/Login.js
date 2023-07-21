import React, { useState } from 'react'
import '../Styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { isBookingDate } from '../Services/Actions/action';

export default function Login() {
   
    const uri="http://localhost:8080/signin";
       const data={email:"", password:""};
       const [inputData,setInputData]=useState(data);
       const [resStatus,setResStatus]=useState(false);
       const dispatch= useDispatch();
       const navigate=useNavigate();
       localStorage.setItem("isSignin",false);
       const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
       console.log(inputData);
    }

    const signIn=(e)=>{
        
        axios.post(uri,inputData)
        .then((response)=>{
          
            if(response.status ===401){
                   setResStatus(true)
                   console.log(response)
            }
            if(response.status===200){
                dispatch(isBookingDate(true))
                localStorage.setItem("isSignin",true);
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("userid",response.data.userdata.id);
                localStorage.setItem("username",response.data.userdata.firstName+" "+response.data.userdata.lastName);
                   navigate("/")
     
            }
           
    })
        .then ((err)=>console.error(err));
       
        e.preventDefault();
    }
   
    return (
        <>
            <div class="signup-form">
                <form  >
                    <h2>Sign In</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
                        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </symbol>

                    </svg>
                    <div class={`alert alert-danger d-flex align-items-center ${resStatus?"visibal":"invisible"}`} style={{height: "2px"}} role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Success:"><use href="#check-circle-fill" /></svg>
                        <div>
                            Invalid Usernam/Password
                        </div>
                    </div>
                    <hr />
                    <div class="form-group">

                        <div class="form-group">
                            <input type="email"  onChange={handleData} value={inputData.email} name="email" class="form-control" name="email" placeholder="Email" required="required" />
                        </div>

                        <div class="form-group">
                            <input type="password" onChange={handleData} value={inputData.password} name="password" class="form-control" name="password" placeholder="Password" required="required" />
                        </div>


                        <div class="form-group ">
                            <button type="submit" onClick={(e)=>signIn(e)} class="btn btn-primary btn-lg ">Sign In</button>
                        </div>
                        <div class="hint-text">Not a member? <Link to="/signup">Signup Now</Link></div>


                        <div class="d-flex justify-content-around">
                            <i class="fa fa-facebook-f"></i>
                            <i class="fa fa-twitter"></i>
                            <i class="fa fa-google"></i>
                            <i class="fa fa-linkedin"></i>
                            <i class="fa fa-github"></i>
                        </div>
                    </div>
                </form>

            </div>

        </>
    )
}
