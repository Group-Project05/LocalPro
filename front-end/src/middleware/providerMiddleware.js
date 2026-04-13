
import store from "../store/store"
import { redirect } from "react-router-dom"

export const providerMiddleware = () => {
    const state = store.getState();
    const authtype = state.auth.user?.role;
    
    if (authtype !== "provider") {
        return redirect("/login");
    }
    return null; // allows the route to load
}


export default providerMiddleware;