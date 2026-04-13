import { Outlet } from "react-router-dom";
import ProviderLayout from "./ProviderLayout";
const ServiceProvider =()=>{
    return(<>
    <ProviderLayout>
        <Outlet/>
    </ProviderLayout>
    </>);
}

export default ServiceProvider;