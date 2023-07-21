import React, { useRef } from 'react'
import '../Styles/registration.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Registration() {
    const uri = "http://localhost:8080/signup";
    const data = { firstName: "", lastName: "", mobileNo: "", email: "", address: "", password: "" };
    const [inputData, setInputData] = useState(data);
    
    const[resStatus,setResStatus]=useState();
   
     console.log(resStatus + "stats");
    const refForm = useRef(null);
    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
        // console.log(inputData);
    }

    const signUp = (event) => {
       event.preventDefault();

        if (inputData.email !== '' || inputData.address !== '' || inputData.firstName !== '' ||
            inputData.lastName !== '' || inputData.mobileNo !== '' || inputData.password !== '') {

            axios.post(uri, inputData)
                .then(function (res) {
                    if (res.status === 201) {
                        setResStatus(201);
                     
                       setInputData(data);
                       
                    } else {
                        console.log(res.status);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })

               

        }
    }

    return (
        <>
            <div className="signup-form">
                <form >
                    <h2>Sign Up</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} />

                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </symbol>
                    </svg>

                    <div className={`alert alert-success d-flex align-items-center ${resStatus ===201?"visibal":"invisible"} ` }style={{ height: "2px" }} role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Success:"><use href="#check-circle-fill" /></svg>
                        <div>
                            Registration Successfully
                        </div>
                    </div>
                    <hr />
                    <input type="hidden" name="userType" value="user" />
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm"><input type="text" onChange={handleData} className="form-control" value={inputData.firstName} name="firstName" placeholder="First Name" required="required" /></div>

                            <div className="col-sm"><input type="text" onChange={handleData} className="form-control" value={inputData.lastName} name="lastName" placeholder="Last Name" required="required" /></div>
                        </div>
                    </div>


                    <div className="form-group">
                        <input type="number" onChange={handleData} className="form-control" value={inputData.mobileNo} name="mobileNo" placeholder="Mobile No" required="required" />
                    </div>

                    <div className="form-group">
                        <input type="email" onChange={handleData} className="form-control" value={inputData.email} name="email" placeholder="Email" required="required" />
                    </div>

                    <div className="form-group">
                        <input type="text" onChange={handleData} className="form-control" value={inputData.address} name="address" placeholder="Address" required="required" />
                    </div>

                    <div className="form-group">
                        <input type="password" onChange={handleData} className="form-control" value={inputData.password} name="password" placeholder="Password" required="required" />
                    </div>


                    <div className="form-group ">
                        <button type="submit" onClick={(event) => { signUp(event) }} className="btn btn-primary btn-lg ">Sign Up</button>
                    </div>
                    <div className="hint-text" >Already have an account? <span ><Link to="/SignIn">SignIn</Link></span></div>
                    <div className="d-flex justify-content-around">
                        <i className="fa fa-facebook-f"></i>
                        <i className="fa fa-twitter"></i>
                        <i className="fa fa-google"></i>
                        <i className="fa fa-linkedin"></i>
                        <i className="fa fa-github"></i>
                    </div>
                </form>

            </div>





        </>
    )
}
