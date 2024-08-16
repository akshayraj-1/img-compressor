import {Suspense} from "react";
import Navbar from "./components/UI/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/UI/Footer.jsx";

function App() {

    return (
        <>
            <Navbar/>
            <Suspense>
                <Outlet/>
            </Suspense>
            <Footer/>
        </>
    );
}

export default App;
