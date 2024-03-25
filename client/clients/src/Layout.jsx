import { Outlet } from "react-router-dom";
import Header from "./Components/headers/Header";

export default function Layout(){
    return(
        <div className="py-4 px-8 left-0 rigth-0 top-0 flex flex-col min-h.screen ">
            <Header/>
            <Outlet/>
        </div>

    )
}