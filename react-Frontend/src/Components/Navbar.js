import React, { useEffect, useState } from 'react'
import image from '../Images/logo2.png';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();
  const isSignin=useSelector((state)=>state.isBooking);
  console.log(isSignin+"  navbar");
  let isSign=localStorage.getItem("isSignin");
 // console.log(isSign+" lo(cal");

 const userName=localStorage.getItem("username");
    const[refresh,setRefresh]=useState(0);
    const logOut=()=>{
      localStorage.setItem("isSignin",false);
       isSign=localStorage.getItem("isSignin");
       localStorage.setItem("token",null);
       localStorage.setItem("username",null);
       localStorage.setItem("userid",null)
       setRefresh(refresh+1);
       navigate("/");
      // console.log(isSign+" out");
    }

    useEffect(()=>{
       
    },[isSign,refresh,userName,logOut,isSignin])
 
  //  console.log(isSign+" locallast");
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
   <NavLink to=""> <img src={image} alt="Image" /></NavLink>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
  
    <ul className="navbar-nav ms-auto">
      {(isSign==="false"?true:false) &&
      <>
      <li className={`nav-item active  `}>
        <NavLink className="nav-link" to="SignIn">SignIn</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="SignUp">Signup</NavLink>
      </li>
      </>
}
      { (isSign==="true"?true:false) &&
      <>
      <li className="nav-item">
        <a className="nav-link" href="#">{userName}</a>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" to="appointments">Appointment</NavLink>
      </li>
       <li className="nav-item ">
        <button className='nav-link' onClick={logOut}>Logout</button>
      
      </li>
      </>
}
      <li className="nav-item">
        <a className="nav-link" href="#">Services</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Contact</a>
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar