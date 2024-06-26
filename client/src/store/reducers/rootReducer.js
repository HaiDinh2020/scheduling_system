import authReducer from "./authReducer";
import userReducer from "./userReducer";
import garageReducer from "./garageReducer";
import bookingReducer from "./bookingReducer";
import postReducer from "./postReducer";
import carReducer from "./carReducer";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import mechanicReducer from "./mechanicReducer";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2

}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token', 'role' ]
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    garage: garageReducer,
    booking: bookingReducer,
    post: postReducer,
    cars: carReducer,
    mechanics: mechanicReducer
})

export default rootReducer;