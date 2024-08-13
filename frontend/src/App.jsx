import {Suspense} from "react";
import Navbar from "./components/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";

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
