import "./main.scss";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>} errorElement={<Error/>}>
            <Route index element={<Home/>}/>
        </Route>
    )
);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
