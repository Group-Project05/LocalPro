
import store from "../store/store";
import { redirect } from "react-router-dom";

export const userMiddleware = () => {
    const state = store.getState();
    const authtype = state.auth.user?.role;
    
    if (authtype !== "user") {
        return redirect("/login");
    }
    return null; // allows the route to load
}

export default userMiddleware;