 import store from "../store/store"
import { Navigate, redirect } from "react-router-dom"

export const adminMiddleware = () => {
    const state = store.getState();
    const authtype = state.auth.user?.role;
    
    if (authtype !== "admin") {
        return redirect("/login");
    }
    return null; // allows the route to load
}

 export default adminMiddleware;