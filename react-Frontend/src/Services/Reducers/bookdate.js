import { IS_BOOKING } from "../../Constant";

export default function isBookingReducer(state=false,action){
        switch(action.type){
           
            case IS_BOOKING:
                console.log(action.data+"is booking");
                return action.data;
                default:
                    return state;
        }
}