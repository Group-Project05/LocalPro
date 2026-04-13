import { Outlet } from "react-router-dom";
import UserLayoutComponent from "./UserLayout";
const User =()=>{
    return(<>
    <UserLayoutComponent>
        <Outlet/>
    </UserLayoutComponent>
    
    </>);
}

export default User;