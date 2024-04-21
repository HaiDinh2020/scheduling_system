import authReducer from "./authReducer";
import userReducer from "./userReducer";
import garageReducer from "./garageReducer";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

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
})

export default rootReducer;