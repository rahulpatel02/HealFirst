import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../Styles/index.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { getDoctorCategory } from '../Services/Actions/action';
function Index() {

  const [post, setPost] = useState([]);
  let uri = "http://localhost:8080/all";
   const dispatch= useDispatch();
     function setData(data){
      localStorage.setItem('doctorCategory', data);
     }
 
   
  useEffect(() => {
    const getApiData = async () => {
      try {
        const res = await axios.get(uri)
        setPost(res.data);
        console.log(post +"index");
      } catch (error) {
        console.log(error.message);
      }
    };
    getApiData();


  }, [])

  return (
    <>
    <div className="container banner">
      <img className='banner-img' src= {require('../Images/banner.png')} />
    </div>
      <div className='description container'>
        <div><h4>Book an appointment for an in-clinic consultation</h4></div>
        <div><p>Find experienced doctors across all specialties</p></div>
      </div>
      <div>
        <div className="container">
          <div className="row">
            {post.map((item,index) => {
              return(
              
             
            <div className="col-md-3" key={index}>
                 <NavLink  to='/doctorlist'  target='blank' onClick={()=>{setData(item.diseaseName)}} style={{ textDecoration: 'none' }}>
              <div className="card zoom" >
                <img src={require("../Images/DoctorCategory/"+`${item.diseaseImage}`)} />
                <div className="card-body">
                  <h5 className="card-title">{item.diseaseName}</h5>
                  <p className="card-text">{item.diseaseDescription}</p>
                </div >
                
              </div>
             
          
            </NavLink>
              </div>
             )})}
          </div>
        </div>
      </div>


{/* Slider */}
<div className='card-testmonial'>
    <h2>What our users have to say</h2>
  </div>


  <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
 
 <div className="carousel-inner">
   <div className="carousel-item active" data-bs-interval="2000">
     <h5>Very good app. Well thought out about booking/rescheduling/canceling an appointment.
        Also, Doctor's feedback mechanism is good and describes all the basics in a good way</h5>
   </div>
   <div className="carousel-item" >
   <h5>Very easy to book,maintain history. Hassle free from older versions of booking appointment via telephone..
      Thanks Practo for making it simple.</h5>
   </div>
   <div className="carousel-item"data-bs-interval="2000">
   <h5 >Very helpful. Far easier than doing same things on computer. Allows quick and easy search with speedy booking.
      Even maintains history of doctors visited.</h5>
   </div>
 </div>
 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
   <span className="carousel-control-prev-icon" aria-hidden="true"></span>
   <span className="visually-hidden">Previous</span>
 </button>
 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
   <span className="carousel-control-next-icon" aria-hidden="true"></span>
   <span className="visually-hidden">Next</span>
 </button>
</div>


    </>
  )
}

export default Index