import { combineReducers } from "redux";
import doctorCategory from "./reducer";
import isBookingReducer from "./bookdate";

const reducers=combineReducers({
    doctorCategoryName:doctorCategory,
    isBooking:isBookingReducer
})
export default reducers;