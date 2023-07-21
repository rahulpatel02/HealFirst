import React, { useEffect, useState } from 'react'
import '../Styles/doctorlist.css'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function DoctorList() {

    const [doctorList, setDoctorList] = useState([]);
    const token=localStorage.getItem("token");
  
   // console.log(data.date);
    const[inputData,setInputData]=useState({doctorName:"",diseaseName:"",date:"", time:"",location:"", userId:""});
     const navigate=useNavigate();
     
  
  

    const categoryName = localStorage.getItem('doctorCategory');
    let uri = `http://localhost:8080/doctorlist${categoryName}`;

    useEffect(() => {
        const getApiData = async () => {
            try {
                const res = await axios.get(uri)
                setDoctorList(res.data)

            } catch (error) {
                console.log(error.message);
            }
        };
        getApiData();


    }, [])
   

       const saveAppontment=()=>{
        const uri = "http://localhost:8080/saveappointment";
        axios.post(uri,inputData,
            
           { headers: {
                'Authorization' : `Bearer ${token}`,
                'Accept' : 'application/json',
             'Content-Type': 'application/json'
              } 
       })
        .then((response)=>{
            console.log(response);
        })
        .catch(err=>console.log(err))
       }
    //Booking Date ------

    const [isSlotOpen, setSlotOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [openIndex, setOpenIndex] = useState(-1);
   

    const handleButtonClick = (index) => {
        if(localStorage.getItem("isSignin")==="false"){
                navigate("/SignIn");
        }else{
        setSlotOpen(true);
        setOpenIndex(index === openIndex ? -1 : index);
        console.log(JSON.stringify(doctorList[index].id)+"test data");
            
        setInputData({...inputData,doctorName:doctorList[index].doctorName, diseaseName:doctorList[index].doctorCategory,
            location:doctorList[index].location,userId:localStorage.getItem("userid")});
            console.log(JSON.stringify(inputData)+"doctorlist inputdata");
          
        const currentDate = new Date();
        const today = currentDate.toISOString().slice(0, 10);
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 2);

        const formattedToday = getFormattedDate(today);
        const formattedTomorrow = getFormattedDate(tomorrow.toISOString().slice(0, 10));
        const formattedNextDay = getFormattedDate(nextDay.toISOString().slice(0, 10));

        setSelectedDate(`${formattedNextDay}`);

        const availableTimeSlots = generateTimeSlots();
        setTimeSlots(availableTimeSlots);
        }
    };
// generate time slots on date(Today, Tomorrow etc)
    function Slots(data,index) {
        const availableTimeSlots = generateTimeSlots(data,index);
        setTimeSlots(availableTimeSlots);
    }




    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const generateTimeSlots = (data,index) => {

        const currentDate = new Date();
        const today = currentDate.toISOString().slice(0, 10);
        // console.log(currentDate.getHours());
        // console.log(currentDate.toISOString().slice(5, 15));
        const tomorrow = new Date(currentDate);
       
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 2);

        const dates = [today, tomorrow.toISOString().slice(0, 10), nextDay.toISOString().slice(0, 10)];
        const todayUser = [today];
        const tomorrowUser = [tomorrow];
        const dayAfterTomorrowUser = [nextDay];

        const timeSlots = [];
        const todayStartHour = currentDate.getHours(); // Start hour for time slots
        const otherDayStartHour = 9;
        const endHour = 17; // End hour for time slots
        
        todayUser.forEach((date) => {
            for (let hour = todayStartHour + 1; hour <= endHour; hour++) {
             
                const formattedTimeSlot = `${hour}:00 - ${hour + 1}:00`;
                timeSlots.push(formattedTimeSlot);
            }
        });

        if ('tomorrow' === data) {
            console.log(tomorrow.toISOString().slice(0, 10)+"tommarow");
            console.log(doctorList[index].diseaseName);
           setInputData({...inputData,date:tomorrow.toISOString().slice(0, 10)});
                console.log(JSON.stringify(inputData)+"doctorlist tommorow");
            timeSlots.length = 0;
            tomorrowUser.forEach((date) => {
                for (let hour = otherDayStartHour; hour <= endHour; hour++) {
                   
                    const formattedTimeSlot = `${hour}:00 - ${hour + 1}:00 `;
                    timeSlots.push(formattedTimeSlot);
                }
                console.log(timeSlots[0]+ "zerotime slot");
            });
        }
        if ('dayaftertomorrow' === data) {
            timeSlots.length = 0;
            dayAfterTomorrowUser.forEach((date) => {
                for (let hour = otherDayStartHour; hour <= endHour; hour++) {
                    const formattedTimeSlot = `${hour}:00 - ${hour + 1}:00`;
                    timeSlots.push(formattedTimeSlot);
                }
            });
        }
        return timeSlots;
    };

     const bookAppointment=(index)=>{
          console.log( timeSlots[index]+"clik on time slot");

        setInputData({...inputData,time:timeSlots[index]});
            console.log(JSON.stringify(inputData)+"doctorlist inputdata");
            setInputData({...inputData,time:timeSlots[index]});
            console.log(JSON.stringify(inputData)+"doctorlist inputdata");
     }

     console.log(JSON.stringify(inputData)+"data outrt");
    

     useEffect(() => {
        console.log("useeffact")
        if(inputData.time !==""){
            saveAppontment();
        }
       
    }, [bookAppointment])
    

    return (
        <>

            {doctorList.map((item, index) => {
                return (
                    <div>
                        <ul className="list-group list-group-horizontal container" key={index}>
                            <li className="list-group-item mainimg">
                                <img className='doctorimg' src={require("../Images/DoctorsImage/" + `${item.imageName}`)} />
                            </li>
                            <li className="list-group-item information">
                                <h3 className='name'   style={{ color: "#14bef0", fontWeight: "400" }}>{item.doctorName}</h3>

                                <div style={{ color: "#787887" }}>
                                    <li className='infocontent'>{item.doctorCategory}</li>

                                    <li className='infocontent'>{item.experience}</li>
                                </div>

                                <li className='infocontent' style={{ fontWeight: "500" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>{item.location}</li>
                                <li className='infocontent'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                                    <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                </svg>{item.fee} Consultation Fee</li>

                                <li>
                                    <span className='userrating'>Patient Rating </span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className={`fa fa-star ${item.rating > 4 ? `checked` : ``}`} ></span>
                                </li>
                                <li>{item.rating} average based on {Math.floor((Math.random() * 100) + 150)} reviews.</li>


                            </li>
                            <li className="list-group-item information ">

                                <li className='payinformation' style={{ color: "green" }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>Available Today</li>


                                <li><button type="button" onClick={() => {handleButtonClick(index)}} style={{ color: "white", backgroundColor: "#14bef0" }} className="btn btn paybutton">Book Appointment</button></li>

                            </li>
                        </ul>
                        <span>
                            <div >
                                {openIndex === index && (
                                    <div className='list list-group-horizontal container  maintimeslot'>
                                        <div className='dayslot'>
                                        <button type="button" style={{ fontWeight: "500"}}  className='btn btn primary mainbutton' onClick={handleButtonClick}>Today</button>
                                        
                                        <button type="button"style={{ fontWeight: "500"}}  className='btn btn primary mainbutton' onClick={() => { Slots('tomorrow',index) }}>Tomorrow</button>
                                        <button  type="button" style={{ fontWeight: "500"}} className='btn btn primary mainbutton' onClick={() => { Slots('dayaftertomorrow') }}>{selectedDate} </button><br></br>
                                        {/* <span className='slotscount'>2 Slots Available</span>
                                        <span className='slotscount'> 3 Slots Available</span>
                                        <span className='slotscount'>30 Slots Available</span> */}
                                       </div>
                                       <div className='timeslot'>
                                        <ul>
                                            {timeSlots.map((timeSlot, index) => (
                                                <button type="button" onClick={()=>bookAppointment(index)} style={{ color: "green", backgroundColor: "white", border: "1px solid green", margin: "4px", width: "117px" }} className="btn btn paybutton" key={index}>{timeSlot}</button>
                                            ))}
                                        </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </span>
                    </div>

                )

            })}

        </>
    )
}


export default DoctorList