import {Suspense} from "react";
import Navbar from "./components/Layouts/Navbar.jsx";
import {Outlet} from "react-router-dom";
import MainBackground from "./components/Backgrouds/MainBackground.jsx";

function App() {

    return (
        <MainBackground className="w-screen h-screen">
            <Navbar/>
            <Suspense>
                <Outlet/>
            </Suspense>
        </MainBackground>
    )
}

export default App;
