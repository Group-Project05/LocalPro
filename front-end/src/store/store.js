import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authReducer"
import favReducer from "./slice/favReducer"

const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favReducer
    }
})

export default store;