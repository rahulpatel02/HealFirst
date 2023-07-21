import { DOCTOR_CATEGORY } from "../../Constant";

const initialState=""
export default function doctorCategory(state=initialState, action){

    switch(action.type){
      
        case DOCTOR_CATEGORY:
            console.log(action.data +"reducer");
             return state;
            
             default:
                return state;


    }

}