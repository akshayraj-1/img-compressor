import {Suspense} from "react";
import Navbar from "./components/UI/Navbar.jsx";
import {Outlet} from "react-router-dom";

function App() {

    return (
        <>
            <Navbar/>
            <Suspense>
                <Outlet/>
            </Suspense>
        </>
    )
}

export default App;
