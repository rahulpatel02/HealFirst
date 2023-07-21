import { DOCTOR_CATEGORY, IS_BOOKING } from "../../Constant"


export const getDoctorCategory=(data)=>{
    console.log(data+ "action");
    return(dispatch)=>{
        dispatch({
            type:DOCTOR_CATEGORY,
            data:data
        })
    }
}

export const isBookingDate=(data)=>{
    console.log(data+"action sign");
      return(dispatech)=>{
        dispatech({
            type:IS_BOOKING,
            data:data
        })
      }
}